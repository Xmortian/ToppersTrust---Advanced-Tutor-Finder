const express = require('express');
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SSLCommerz Configuration
const store_id = 'toppe6929f5132dfda';
const store_passwd = 'toppe6929f5132dfda@ssl';
const is_live = false; // Sandbox mode

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend server is running' });
});

// ============================================
// POST /api/payment/initiate
// ============================================
app.post('/api/payment/initiate', async (req, res) => {
    try {
        const { tutorId, tutorName, amount, email, phone } = req.body;

        console.log('📥 Payment initiation request:', { tutorId, tutorName, amount });

        // Validate input
        if (!tutorId || !tutorName || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: tutorId, tutorName, or amount'
            });
        }

        // Generate unique transaction ID
        const tran_id = `TT-${Date.now()}-${tutorId}`;

        const baseUrl = 'http://localhost:3000';
        const frontendUrl = 'http://localhost:5173';

        // SSLCommerz payment data
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
            cus_add1: 'Dhaka',
            cus_add2: 'Bangladesh',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: phone || '01711111111',
            cus_fax: '01711111111',
            ship_name: tutorName,
            ship_add1: 'Dhaka',
            ship_add2: 'Bangladesh',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
            value_a: tutorId,
            value_b: 'advertisement',
        };


        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        
        const apiResponse = await sslcz.init(data);


        if (apiResponse.status === 'SUCCESS') {

            res.json({
                success: true,
                message: 'Payment session created successfully',
                redirectUrl: apiResponse.GatewayPageURL,
                transactionId: tran_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to initialize payment session'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error: ' + error.message
        });
    }
});

// POST /api/payment/success
app.post('/api/payment/success', async (req, res) => {
    try {
        const { tran_id, val_id, amount, status, value_a } = req.body;
        const tutorId = value_a;


        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const validation = await sslcz.validate({ val_id });

        if (validation.status === 'VALID' || validation.status === 'VALIDATED') {

            res.redirect(`http://localhost:5173/tutor-dashboard?payment=success&tx_id=${tran_id}`);
        } else {
            res.redirect(`http://localhost:5173/tutor-dashboard?payment=failed`);
        }
    } catch (error) {
        res.redirect(`http://localhost:5173/tutor-dashboard?payment=error`);
    }
});

// POST /api/payment/fail
app.post('/api/payment/fail', async (req, res) => {
    const { tran_id } = req.body;
    console.log('❌ Payment failed:', tran_id);
    res.redirect(`http://localhost:5173/tutor-dashboard?payment=failed`);
});

// POST /api/payment/cancel
app.post('/api/payment/cancel', async (req, res) => {
    const { tran_id } = req.body;
    console.log('⚠️ Payment cancelled:', tran_id);
    res.redirect(`http://localhost:5173/tutor-dashboard?payment=cancelled`);
});

// POST /api/payment/ipn
app.post('/api/payment/ipn', async (req, res) => {
    try {
        const { tran_id, val_id, status } = req.body;
        console.log('🔔 IPN received:', { tran_id, status });

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const validation = await sslcz.validate({ val_id });

        if (validation.status === 'VALID' || validation.status === 'VALIDATED') {
            console.log('✅ IPN: Payment confirmed for transaction:', tran_id);
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('💥 IPN handler error:', error);
        res.status(500).send('Error');
    }
});

// Start server
app.listen(PORT, () => {
});