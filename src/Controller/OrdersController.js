import { response } from 'express';
import pool from '../Database/mysql';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

// Fonction pour ajouter une nouvelle commande
export const addNewOrders = async (req, res = response) => {
    try {
        const { uidAddress, total, typePayment, products, instructions, customerPhoneNumber } = req.body;

        console.log('Données reçues :', { uidAddress, total, typePayment, products, instructions });

        let paymentUrl = null;
        let transactionId = null;

        // Si le paiement est par Mobile Money, déclencher Maishapay
        if (typePayment === 'AIRTEL MONEY') {
            const maishapayResponse = await initiateMaishapayPayment(total, req.uid, customerPhoneNumber);
        
            console.log('Réponse de Maishapay :', maishapayResponse); // Log pour vérifier la réponse
        
            // Vérifiez si le statut est SUCCESS
            if (maishapayResponse.status !== 'SUCCESS') {
                return res.status(400).json({
                    resp: false,
                    msg: 'Le paiement a échoué ou est en attente.',
                });
            }
        
            // Récupérez l'ID de transaction
            transactionId = maishapayResponse.transactionId;

            // Ajouter la commande à la base de données uniquement si la transaction a réussi
            const orderdb = await pool.query(
                'INSERT INTO orders (client_id, address_id, amount, pay_type, special_instructions) VALUES (?,?,?,?,?)',
                [req.uid, uidAddress, total, typePayment, instructions]
            );

            console.log('Requête SQL pour orders :', 'INSERT INTO orders (client_id, address_id, amount, pay_type, special_instructions) VALUES (?,?,?,?,?)', [req.uid, uidAddress, total, typePayment, instructions]);

            // Ajouter les détails de la commande
            products.forEach(o => {
                pool.query(
                    'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?,?,?,?)',
                    [orderdb.insertId, o.uidProduct, o.quantity, o.quantity * o.price]
                );

                console.log('Requête SQL pour orderDetails :', 'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?,?,?,?)', [orderdb.insertId, o.uidProduct, o.quantity, o.quantity * o.price]);
            });

            // Log pour vérifier la réponse finale du backend
            console.log('Réponse du backend :', {
                resp: true,
                msg: 'New Order added successfully',
                transactionId: transactionId,
            });

            res.json({
                resp: true,
                msg: 'New Order added successfully',
                transactionId: transactionId, // Retournez l'ID de transaction
                paymentUrl: `http://172.20.10.3:7070/api/payment-result?transactionId=${transactionId}`, // URL de la page de résultat
            });
        } else {
            // Si le type de paiement n'est pas Mobile Money, insérez simplement la commande sans vérifier Maishapay
            const orderdb = await pool.query(
                'INSERT INTO orders (client_id, address_id, amount, pay_type, special_instructions) VALUES (?,?,?,?,?)',
                [req.uid, uidAddress, total, typePayment, instructions]
            );

            console.log('Requête SQL pour orders :', 'INSERT INTO orders (client_id, address_id, amount, pay_type, special_instructions) VALUES (?,?,?,?,?)', [req.uid, uidAddress, total, typePayment, instructions]);

            // Ajouter les détails de la commande
            products.forEach(o => {
                pool.query(
                    'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?,?,?,?)',
                    [orderdb.insertId, o.uidProduct, o.quantity, o.quantity * o.price]
                );

                console.log('Requête SQL pour orderDetails :', 'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?,?,?,?)', [orderdb.insertId, o.uidProduct, o.quantity, o.quantity * o.price]);
            });

            res.json({
                resp: true,
                msg: 'New Order added successfully',
            });
        }
    } catch (e) {
        console.error('Erreur lors de l\'ajout de la commande :', e); // Log pour capturer les erreurs
        return res.status(500).json({
            resp: false,
            msg: e.toString(),
        });
    }
};

// Fonction pour initier le paiement Maishapay
const initiateMaishapayPayment = async (amount, customerId, customerPhoneNumber) => {
    const transactionReference = Math.floor(Math.random() * 100000000).toString();

    const maishapayData = {
        transactionReference: transactionReference,
        gatewayMode: "0", // 1: Production; 0: Sandbox
        //publicApiKey: "MP-LIVEPK-ZeQ9AIdLuvM$l7v83TBR$MxQOtf1CMJdE35Si7aA62g$hyoe1x8dOAmeK.uCa5DEgX1l$5YwjSHFXO$rouioWuE8H0FHXdQ2H2TcZFa51P$yeH0209YEuta3", // Live
        //secretApiKey: "MP-LIVEPK-b1fx2StEu8yQOx8Vm0$juGyv09Yc0Flw$rJpP.$fFH/N0.12Ob0H0xYMnmH$AVSCo7ye9al.6d69mbHiSvS5A2ujjs8aK3ULarqWd0$SXm17w9a$QJ..ij6d", // Live

        publicApiKey: "MP-SBPK-0/LwuTVZdOAWjoz72ei$q81tiBvgtwP0$yI71U$tuBSUguUje0hs7.KZSjo.yJLd0Zi$kNg4tL0JGbHvOw2Hs2j7nFv$aw1u3cUy7tqOXzs6$e8201rjzyGb", // SB
        secretApiKey: "MP-SBPK-2sYotlW8ZiyUNnlVklfuOSSkJBxyrkEQ.fbs.$c$p.nc7Ay$1.RmBqb$Sg01qW2UCr0Y3hhoqDh4owutNWf1GcYbjfmEEQ21ZvrBvdF$2.$nB1Ama2GrMCWM", // SB

        order: {
            amount: amount.toString(),
            currency: "USD", // ou "USD" selon votre besoin
            customerFullName: "John Doe", // Remplacez par le nom du client
            customerEmailAdress: "john.doe@example.com" // Remplacez par l'email du client
        },
        paymentChannel: {
            channel: "MOBILEMONEY",
            provider: "AIRTEL", // ou "ORANGE", "MTN", etc.
            walletID: "+243972416724", // Remplacez par le numéro du client
            callbackUrl: "http://172.20.10.3:7070/api/payment-result?transactionId=" + transactionReference // URL de callback
        }
    };

    try {
        // Initier la transaction
        const response = await axios.post('https://marchand.maishapay.online/api/collect/v2/store/mobileMoney', maishapayData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('Réponse complète de Maishapay :', response.data);

        // Vérifiez que la réponse contient un statut 200 (SUCCESS) ou 202 (PENDING)
        if (response.data.status_code === 200 || response.data.status_code === 202) {
            const transactionId = response.data.transactionId;

            // Attendre que la transaction passe à SUCCESS ou échoue
            let transactionStatus = response.data.transactionStatus;
            let attempts = 0;
            const maxAttempts = 30; // Nombre maximal de tentatives (30 * 10 secondes = 5 minutes)
            const interval = 10000; // Vérifier toutes les 10 secondes

            while (transactionStatus === 'PENDING' && attempts < maxAttempts) {
                await new Promise(resolve => setTimeout(resolve, interval)); // Attendre 10 secondes
                const statusResponse = await axios.get(`https://marchand.maishapay.online/api/collect/v2/transaction/${transactionId}/status`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${maishapayData.secretApiKey}`
                    }
                });

                transactionStatus = statusResponse.data.transactionStatus;
                attempts++;
                console.log(`Tentative ${attempts}: Statut de la transaction - ${transactionStatus}`);
            }

            if (transactionStatus === 'SUCCESS') {
                return {
                    status: 'SUCCESS',
                    payment_url: `http://172.20.10.3:7070/api/payment-result?transactionId=${transactionId}`,
                    transactionId: transactionId
                };
            } else {
                throw new Error(`La transaction est restée en attente ou a échoué. Statut final : ${transactionStatus}`);
            }
        } else {
            throw new Error(`La réponse de Maishapay n'est pas valide. Code: ${response.data.status_code}, Message: ${response.data.message}`);
        }
    } catch (error) {
        console.error('Erreur lors de l\'initiation du paiement Maishapay :', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Route pour servir la page de résultat de transaction
export const getPaymentResultPage = async (req, res) => {
    try {
        // Chemin vers le fichier HTML
        const filePath = path.join(__dirname, 'payment_result.html');

        // Lire le fichier HTML
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur lors de la lecture du fichier HTML :', err);
                return res.status(500).send('Erreur interne du serveur');
            }

            // Envoyer le fichier HTML comme réponse
            res.send(data);
        });
    } catch (e) {
        console.error('Erreur lors de la récupération de la page de résultat :', e);
        res.status(500).send('Erreur interne du serveur');
    }
};

// Route pour vérifier le statut de la transaction
export const getTransactionStatus = async (req, res) => {
    try {
        const { transactionId } = req.query;

        // Vérifiez le statut de la transaction auprès de Maishapay
        const response = await axios.get(`https://marchand.maishapay.online/api/collect/v2/transaction/${transactionId}/status`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_SECRET_API_KEY' // Remplacez par votre clé API secrète
            }
        });

        // Renvoyer le statut de la transaction
        res.json(response.data);
    } catch (e) {
        console.error('Erreur lors de la vérification du statut de la transaction :', e);
        res.status(500).json({
            resp: false,
            msg: e.toString(),
        });
    }
};













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