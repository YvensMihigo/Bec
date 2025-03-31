import { response } from 'express';
import pool from '../Database/mysql';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import winston from 'winston';
import crypto from 'crypto';

const OPERATORS = {
    'AIRTEL MONEY': { pawapay: 'AIRTEL_COD', maishapay: 'AIRTEL' },
    'ORANGE MONEY': { pawapay: 'ORANGE_COD', maishapay: 'ORANGE' },
    'M-PESA': { pawapay: 'VODACOM_COD', maishapay: 'MPESA' }
};

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ 
            filename: 'logs/payment_errors.log', 
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({ 
            filename: 'logs/payment_combined.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
                winston.format.timestamp()
            )
        })
    ]
});

// Fonction pour formater les logs de transaction
const transactionLogger = (transactionId, message, data = {}) => {
    logger.info({
        transactionId,
        message,
        ...data,
        timestamp: new Date().toISOString()
    });
};

export const addNewOrders = async (req, res = response) => {
    const transactionStart = Date.now();
    try {
        const { uidAddress, total, typePayment, products, instructions, customerPhoneNumber } = req.body;

        transactionLogger('SYSTEM', 'Début de création de commande', {
            clientId: req.uid,
            amount: total,
            paymentType: typePayment
        });

        if (!OPERATORS[typePayment]) {
            transactionLogger('SYSTEM', 'Type de paiement non supporté', { typePayment });
            return res.status(400).json({ 
                resp: false, 
                msg: 'Type de paiement non supporté' 
            });
        }

        const orderResult = await pool.query(
            `INSERT INTO orders 
            (client_id, address_id, amount, pay_type, special_instructions, status, is_mobile_payment)
            VALUES (?, ?, ?, ?, ?, 'PENDING', 1)`,
            [req.uid, uidAddress, total, typePayment, instructions]
        );

        const orderId = orderResult.insertId || orderResult[0].insertId;
        transactionLogger('SYSTEM', 'Commande créée en base', { orderId });

        if (Array.isArray(products)) {
            for (const product of products) {
                await pool.query(
                    'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, product.uidProduct, product.quantity, product.quantity * product.price]
                );
            }
            transactionLogger('SYSTEM', 'Produits ajoutés à la commande', { orderId, productCount: products.length });
        }

        const paymentResult = process.env.MAISHAPAY_ENABLED === '1'
            ? await initiateMaishapayPayment(total, customerPhoneNumber, typePayment, req.uid)
            : await initiatePawapayPayment(total, customerPhoneNumber, typePayment, req.uid);

        transactionLogger(paymentResult.transactionId, 'Paiement initié', {
            paymentUrl: paymentResult.paymentUrl,
            status: paymentResult.status,
            duration: Date.now() - transactionStart
        });

        res.json({
            resp: true,
            msg: 'Commande créée avec succès',
            transactionId: paymentResult.transactionId,
            paymentUrl: paymentResult.paymentUrl
        });

    } catch (e) {
        transactionLogger('SYSTEM', 'Erreur création commande', {
            error: e.message,
            stack: e.stack,
            duration: Date.now() - transactionStart
        });
        res.status(500).json({
            resp: false,
            msg: 'Erreur lors de la création de la commande',
            error: e.message
        });
    }
};

async function initiatePawapayPayment(amount, phone, operator, clientInfo) {
    const transactionStart = Date.now();
    const depositId = crypto.randomUUID();
    const statementDesc = `CL${clientInfo}${depositId.substring(0, 6)}`;

    transactionLogger(depositId, 'Initialisation paiement Pawapay', {
        amount,
        phone,
        operator,
        clientInfo
    });

    const payload = {
        depositId,
        amount: parseFloat(amount).toFixed(2),
        currency: "USD",
        correspondent: OPERATORS[operator].pawapay,
        payer: {
            type: "MSISDN",
            address: { value: phone.replace('+', '') }
        },
        customerTimestamp: new Date().toISOString(),
        statementDescription: statementDesc,
        country: "COD",
        callbackUrl: process.env.PAWAPAY_CALLBACK_URL || `${process.env.BASE_URL}/pawapay-callback`
    };

    try {
        transactionLogger(depositId, 'Envoi requête à Pawapay', { payload });
        const response = await axios.post(`${process.env.PAWAPAY_API_URL}/deposits`, payload, {
            headers: { 
                'Authorization': `Bearer ${process.env.PAWAPAY_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const paymentUrl = response.data?.checkoutUrl 
            ? response.data.checkoutUrl
            : `${process.env.BASE_URL}/payment-result?transactionId=${depositId}`;

        transactionLogger(depositId, 'Réponse Pawapay reçue', {
            status: 'SUBMITTED',
            paymentUrl,
            responseData: response.data,
            duration: Date.now() - transactionStart
        });

        return {
            status: 'SUBMITTED',
            transactionId: depositId,
            paymentUrl: paymentUrl
        };
    } catch (error) {
        transactionLogger(depositId, 'Erreur API Pawapay', {
            error: error.response?.data || error.message,
            status: 'FAILED',
            duration: Date.now() - transactionStart
        });
        
        return {
            status: 'FAILED',
            transactionId: depositId,
            paymentUrl: `${process.env.BASE_URL}/payment-result?transactionId=${depositId}`
        };
    }
}

async function initiateMaishapayPayment(amount, phone, operator, clientInfo) {
    const transactionStart = Date.now();
    const transactionId = Math.floor(Math.random() * 100000000).toString();

    transactionLogger(transactionId, 'Initialisation paiement Maishapay', {
        amount,
        phone,
        operator,
        clientInfo
    });

    const payload = {
        transactionReference: transactionId,
        gatewayMode: "1",
        publicApiKey: process.env.MAISHAPAY_PUBLIC_KEY,
        secretApiKey: process.env.MAISHAPAY_SECRET_KEY,
        order: {
            amount: amount.toString(),
            currency: "USD",
            customerFullName: 'Client',
            customerEmailAdress: 'client@example.com'
        },
        paymentChannel: {
            channel: "MOBILEMONEY",
            provider: OPERATORS[operator].maishapay,
            walletID: phone,
            callbackUrl: `${process.env.BASE_URL}/api/maishapay-callback`
        }
    };

    try {
        transactionLogger(transactionId, 'Envoi requête à Maishapay', { payload });
        const response = await axios.post(`${process.env.MAISHAPAY_API_URL}/api/collect/v2/store/mobileMoney`, payload);
        
        transactionLogger(transactionId, 'Réponse Maishapay reçue', {
            status: 'SUBMITTED',
            responseData: response.data,
            duration: Date.now() - transactionStart
        });

        return {
            status: 'SUBMITTED',
            transactionId: transactionId,
            paymentUrl: `${process.env.BASE_URL}/payment-result?transactionId=${transactionId}`
        };
    } catch (error) {
        transactionLogger(transactionId, 'Erreur API Maishapay', {
            error: error.response?.data || error.message,
            status: 'FAILED',
            duration: Date.now() - transactionStart
        });
        
        return {
            status: 'FAILED',
            transactionId: transactionId,
            paymentUrl: `${process.env.BASE_URL}/payment-result?transactionId=${transactionId}`
        };
    }
}

export const pawapayCallback = async (req, res) => {
    const { event, data } = req.body;
    const transactionId = data?.depositId || 'UNKNOWN';

    try {
        transactionLogger(transactionId, 'Callback reçu de Pawapay', {
            event,
            callbackData: data
        });

        if (event === 'deposit.success' && data.status === 'COMPLETED') {
            await pool.query(
                `UPDATE orders SET 
                status = 'PAYÉE',
                transaction_id = ?,
                payment_date = NOW()
                WHERE transaction_id = ? OR 
                (status = 'PENDING' AND amount = ?)`,
                [data.depositId, data.depositId, data.amount.value]
            );
            transactionLogger(transactionId, 'Paiement complété avec succès');
        } else if (event === 'deposit.failed') {
            await pool.query(
                `DELETE FROM orders 
                WHERE transaction_id = ? OR 
                (status = 'PENDING' AND amount = ?)`,
                [data.depositId, data.amount.value]
            );
            transactionLogger(transactionId, 'Paiement échoué', { status: data.status });
        }

        res.status(200).send('OK');
    } catch (e) {
        transactionLogger(transactionId, 'Erreur traitement callback Pawapay', {
            error: e.message,
            stack: e.stack
        });
        res.status(500).send('Error');
    }
};

export const getTransactionStatus = async (req, res) => {
    const { transactionId } = req.query;
    const checkStart = Date.now();

    try {
        transactionLogger(transactionId, 'Début vérification statut');

        const [order] = await pool.query(
            `SELECT status FROM orders WHERE transaction_id = ?`,
            [transactionId]
        );

        if (order?.status === 'PAYÉE') {
            transactionLogger(transactionId, 'Statut trouvé en base de données', {
                status: 'COMPLETED',
                duration: Date.now() - checkStart
            });
            return res.json({ status: 'COMPLETED' });
        }

        let status;
        if (process.env.MAISHAPAY_ENABLED === '1') {
            transactionLogger(transactionId, 'Vérification statut Maishapay');
            const response = await axios.get(
                `${process.env.MAISHAPAY_API_URL}/api/collect/v2/transaction/${transactionId}/status`,
                { headers: { 'Authorization': `Bearer ${process.env.MAISHAPAY_SECRET_KEY}` } }
            );
            status = response.data.transactionStatus === 'SUCCESS' ? 'COMPLETED' : 'PENDING';
            transactionLogger(transactionId, 'Réponse Maishapay', {
                apiStatus: response.data.transactionStatus,
                determinedStatus: status
            });
        } else {
            try {
                transactionLogger(transactionId, 'Vérification statut Pawapay');
                const response = await axios.get(
                    `${process.env.PAWAPAY_API_URL}/deposits/${transactionId}`,
                    { headers: { 'Authorization': `Bearer ${process.env.PAWAPAY_API_KEY}` } }
                );
                status = response.data.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING';
                transactionLogger(transactionId, 'Réponse Pawapay', {
                    apiStatus: response.data.status,
                    determinedStatus: status
                });
            } catch (error) {
                transactionLogger(transactionId, 'Erreur vérification statut Pawapay', {
                    error: error.message,
                    fallbackStatus: 'PENDING'
                });
                status = 'PENDING';
            }
        }

        transactionLogger(transactionId, 'Statut final déterminé', {
            status,
            duration: Date.now() - checkStart
        });
        res.json({ status });

    } catch (e) {
        transactionLogger(transactionId, 'Erreur vérification statut', {
            error: e.message,
            stack: e.stack,
            duration: Date.now() - checkStart
        });
        res.status(500).json({ error: e.message });
    }
};

export const getPaymentResultPage = async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'payment_result.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                transactionLogger('SYSTEM', 'Erreur lecture fichier HTML', {
                    error: err.message,
                    filePath
                });
                return res.status(500).send('Erreur interne');
            }
            res.send(data);
        });
    } catch (e) {
        transactionLogger('SYSTEM', 'Erreur page résultat', {
            error: e.message,
            stack: e.stack
        });
        res.status(500).send('Erreur serveur');
    }
};

// ... [Vos autres fonctions existantes restent inchangées] ...

setInterval(async () => {
    try {
        const { affectedRows } = await pool.query(
            `DELETE FROM orders 
            WHERE status = 'PENDING' 
            AND created_at < DATE_SUB(NOW(), INTERVAL 1 DAY)`
        );
        transactionLogger('SYSTEM', 'Nettoyage des transactions expirées', {
            deletedCount: affectedRows
        });
    } catch (error) {
        transactionLogger('SYSTEM', 'Erreur nettoyage transactions', {
            error: error.message
        });
    }
}, 3600000);










// Les autres fonctions restent inchangées
export const getOrdersByStatus = async (req, res = response) => {
  try {
    const ordersdb = await pool.query(`CALL SP_ALL_ORDERS_STATUS(?);`, [req.params.statusOrder]);
    res.json({
      resp: true,
      msg: 'Orders by ' + req.params.statusOrder,
      ordersResponse: ordersdb[0],
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};

export const getDetailsOrderById = async (req, res = response) => {
  try {
    const detailOrderdb = await pool.query(`CALL SP_ORDER_DETAILS(?);`, [req.params.idOrderDetails]);

    res.json({
      resp: true,
      msg: 'Order details by ' + req.params.idOrderDetails,
      detailsOrder: detailOrderdb[0],
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};

export const updateStatusToDispatched = async (req, res = response) => {
  try {
    const { idDelivery, idOrder } = req.body;

    await pool.query('UPDATE orders SET status = ?, delivery_id = ? WHERE id = ?', [
      'ATTRIBUÉE',
      idDelivery,
      idOrder,
    ]);

    res.json({
      resp: true,
      msg: 'Commande attribuée',
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};

export const getOrdersByDelivery = async (req, res = response) => {
  try {
    const ordersDeliverydb = await pool.query(`CALL SP_ORDERS_BY_DELIVERY(?,?);`, [
      req.uid,
      req.params.statusOrder,
    ]);
    res.json({
      resp: true,
      msg: 'All Orders By Delivery',
      ordersResponse: ordersDeliverydb[0],
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};

export const updateStatusToOntheWay = async (req, res = response) => {
  try {
    const { latitude, longitude } = req.body;

    await pool.query('UPDATE orders SET status = ?, latitude = ?, longitude = ? WHERE id = ?', [
      'EN ROUTE',
      latitude,
      longitude,
      req.params.idOrder,
    ]);

    res.json({
      resp: true,
      msg: 'Commande en route',
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};

export const updateStatusToDelivered = async (req, res = response) => {
  try {
    await pool.query('UPDATE orders SET status = ? WHERE id = ?', ['LIVRÉE', req.params.idOrder]);

    res.json({
      resp: true,
      msg: 'Commande livrée',
    });
  } catch (e) {
    return res.status(500).json({
      resp: false,
      msg: e,
    });
  }
};