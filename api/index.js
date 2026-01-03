const express = require('express');
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://toppers-trust.vercel.app' 
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASSWD;
const is_live = false; 

const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;
const getFrontendUrl = (req) => req.get('origin') || 'https://toppers-trust.vercel.app';

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

app.post('/api/payment/initiate', async (req, res) => {
    try {
        const { tutorId, tutorName, amount, email, phone } = req.body;
        const tran_id = `TT-${Date.now()}-${tutorId}`;
        
        // Dynamically get URLs
        const baseUrl = getBaseUrl(req);

        const data = {
            total_amount: parseFloat(amount),
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `${baseUrl}/api/payment/success`, 
            fail_url: `${baseUrl}/api/payment/fail`,
            cancel_url: `${baseUrl}/api/payment/cancel`,
            ipn_url: `${baseUrl}/api/payment/ipn`,
            shipping_method: 'NO',
            product_name: 'Profile Advertisement',
            product_category: 'Service',
            product_profile: 'general',
            cus_name: tutorName,
            cus_email: email || 'customer@example.com',
            cus_phone: phone || '01711111111',
            value_a: tutorId,
        };

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        if (apiResponse.status === 'SUCCESS') {
            res.json({
                success: true,
                redirectUrl: apiResponse.GatewayPageURL,
                transactionId: tran_id
            });
        } else {
            res.status(400).json({ success: false, message: 'SSLCommerz Init Failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/payment/success', async (req, res) => {
    const frontendUrl = 'https://toppers-trust.vercel.app'; 
    const { tran_id, val_id, value_a } = req.body;
    
    try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const validation = await sslcz.validate({ val_id });

        if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
            // Success: Redirect back to frontend
            res.redirect(`${frontendUrl}/tutor-dashboard?payment=success&tx_id=${tran_id}`);
        } else {
            res.redirect(`${frontendUrl}/tutor-dashboard?payment=failed`);
        }
    } catch (error) {
        res.redirect(`${frontendUrl}/tutor-dashboard?payment=error`);
    }
});

module.exports = app;