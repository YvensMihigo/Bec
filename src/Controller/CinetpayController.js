// export const addNewOrders = async (req, res = response) => {
//     try {
//         const { uidAddress, total, typePayment, products, instructions } = req.body;

//         console.log('Données reçues :', { uidAddress, total, typePayment, products, instructions });

//         let paymentUrl = null;

//         // Si le paiement est par Mobile Money, déclencher CinetPay
//         if (typePayment === 'AIRTEL MONEY') {
//             const cinetpayResponse = await initiateCinetpayPayment(total, req.uid);
        
//             console.log('Réponse de CinetPay :', cinetpayResponse); // Log pour vérifier la réponse
        
//             // Vérifiez si le statut est CREATED
//             if (cinetpayResponse.status !== 'CREATED') {
//                 return res.status(400).json({
//                     resp: false,
//                     msg: 'Le paiement a été refusé par CinetPay.',
//                 });
//             }
        
//             // Récupérez l'URL de paiement
//             paymentUrl = cinetpayResponse.payment_url;
//         }

//         console.log('Payment URL:', paymentUrl); // Log pour vérifier l'URL de paiement

//         // Ajouter la commande à la base de données
//         const orderdb = await pool.query(
//             'INSERT INTO orders (client_id, address_id, amount, pay_type, special_instructions) VALUES (?,?,?,?,?)',
//             [req.uid, uidAddress, total, typePayment, instructions]
//         );

//         console.log('Requête SQL pour orders :', 'INSERT INTO orders (client_id, address_id, amount, pay_type, special_instructions) VALUES (?,?,?,?,?)', [req.uid, uidAddress, total, typePayment, instructions]);

//         // Ajouter les détails de la commande
//         products.forEach(o => {
//             pool.query(
//                 'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?,?,?,?)',
//                 [orderdb.insertId, o.uidProduct, o.quantity, o.quantity * o.price]
//             );

//             console.log('Requête SQL pour orderDetails :', 'INSERT INTO orderDetails (order_id, product_id, quantity, price) VALUES (?,?,?,?)', [orderdb.insertId, o.uidProduct, o.quantity, o.quantity * o.price]);
//         });

//         // Log pour vérifier la réponse finale du backend
//         console.log('Réponse du backend :', {
//             resp: true,
//             msg: 'New Order added successfully',
//             paymentUrl: paymentUrl,
//         });

//         res.json({
//             resp: true,
//             msg: 'New Order added successfully',
//             paymentUrl: paymentUrl, // Retournez l'URL de paiement
//         });
//     } catch (e) {
//         console.error('Erreur lors de l\'ajout de la commande :', e); // Log pour capturer les erreurs
//         return res.status(500).json({
//             resp: false,
//             msg: e.toString(),
//         });
//     }
// };

// // Fonction pour initier le paiement CinetPay
// const initiateCinetpayPayment = async (amount, customerId) => {
//     const transactionId = Math.floor(Math.random() * 100000000).toString();
//     const cinetpayData = {
//         apikey: '158247387265f9bc099c0489.63585037', // Remplacez par votre clé API CinetPay
//         site_id: '105890024', // Remplacez par votre site ID CinetPay
//         transaction_id: transactionId,
//         amount: amount,
//         currency: 'USD',
//         description: 'Paiement pour commande',
//         customer_id: customerId,
//         customer_name: 'John',
//         customer_surname: 'Doe',
//         customer_email: 'john.doe@example.com',
//         customer_phone_number: '+243972416724', // Remplacez par le numéro du client
//         customer_address: '123 Rue de la Paix',
//         customer_city: 'Kinshasa',
//         customer_country: 'CD',
//         customer_state: 'CD',
//         customer_zip_code: '00000',
//         notify_url: 'https://votre-domaine.com/cinetpay-notify', // URL de notification
//         return_url: 'https://votre-domaine.com/cinetpay-return', // URL de retour
//         channels: 'ALL', // Canaux de paiement disponibles
//         metadata: 'user1',
//         lang: 'FR',
//         invoice_data: {
//             Donnee1: '',
//             Donnee2: '',
//             Donnee3: ''
//         }
//     };

//     try {
//         const response = await axios.post('https://api-checkout.cinetpay.com/v2/payment', cinetpayData, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         // Log pour vérifier la réponse de CinetPay
//         console.log('Réponse complète de CinetPay :', response.data);

//         // Vérifiez que la réponse contient un code 201 et une payment_url
//         if (response.data.code === '201' && response.data.data && response.data.data.payment_url) {
//             return {
//                 status: 'CREATED', // Utilisez le statut réel de CinetPay
//                 payment_url: response.data.data.payment_url,
//             };
//         } else {
//             throw new Error(`La réponse de CinetPay n'est pas valide. Code: ${response.data.code}, Message: ${response.data.message}`);
//         }
//     } catch (error) {
//         console.error('Erreur lors de l\'initiation du paiement CinetPay :', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };