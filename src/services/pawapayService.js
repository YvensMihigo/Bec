const axios = require('axios');
const config = require('../config/payment');
const { v4: uuidv4 } = require('uuid');

class PawapayService {
    constructor() {
        this.api = axios.create({
            baseURL: config.pawapay.apiUrl,
            headers: {
                'Authorization': `Bearer ${config.pawapay.apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });
    }

    async createDeposit(amount, phone, correspondent, clientInfo) {
        const depositId = uuidv4();
        const statementDesc = this._createStatementDesc(clientInfo.id, clientInfo.name, depositId);

        const payload = {
            depositId,
            amount: parseFloat(amount).toFixed(2),
            currency: "USD",
            correspondent,
            payer: {
                type: "MSISDN",
                address: { value: phone.replace('+', '') }
            },
            customerTimestamp: new Date().toISOString(),
            statementDescription: statementDesc,
            country: "COD",
            callbackUrl: `${process.env.BASE_URL}/api/pawapay-callback`
        };

        try {
            const response = await this.api.post('/deposits', payload);
            return {
                status: config.pawapay.statuses.ACCEPTED,
                depositId,
                checkoutUrl: response.data?.checkoutUrl
            };
        } catch (error) {
            console.error('Pawapay Deposit Error:', error.response?.data || error.message);
            throw new Error('Échec de la création du dépôt');
        }
    }

    async checkDepositStatus(depositId) {
        try {
            const response = await this.api.get(`/deposits/${depositId}`);
            return {
                status: response.data.status,
                details: response.data
            };
        } catch (error) {
            console.error('Status Check Error:', error.response?.data || error.message);
            return { status: config.pawapay.statuses.FAILED };
        }
    }

    _createStatementDesc(clientId, clientName, transactionId) {
        const cleanName = clientName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 5);
        const cleanTxnId = transactionId.replace(/-/g, '').substring(0, 6);
        return `CL${clientId}-${cleanName}-${cleanTxnId}`.substring(0, 22);
    }
}

module.exports = new PawapayService();