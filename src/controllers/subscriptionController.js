
const Razorpay = require('razorpay');
const crypto = require('crypto');
const subscriptionModel = require('../models/subscriptionModel');
require('dotenv').config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const createOrder = async (req, res) => {
    const { plan } = req.body; // 'basic' or 'premium'
    const userId = req.user.id;

    // Define amounts in smallest currency unit (paise)
    const amounts = {
        basic: 1900 * 100, // 1900 INR
        premium: 4900 * 100 // 4900 INR
    };

    const amount = amounts[plan];

    if (!amount) {
        return res.status(400).json({ error: 'Invalid plan selected' });
    }

    const options = {
        amount: amount,
        currency: "INR",
        receipt: `receipt_order_${userId}_${Date.now()}`,
        notes: {
            userId: userId,
            plan: plan
        }
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Razorpay Order Error:', error);
        res.status(500).json({ error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user.id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

    if (expectedSignature === razorpay_signature) {
        // Payment valid
        // Fetch order details to get plan info if needed, or rely on client info (less secure)
        // Ideally we stored order_id -> plan mapping in DB or check notes if readable here

        // For simplicity, we assume we can fetch order or passed plan from client, 
        // OR better: we just mark them as subscribed. 
        // Real implementation: Fetch order from Razorpay to get 'notes'
        try {
            const order = await razorpay.orders.fetch(razorpay_order_id);
            const plan = order.notes.plan;

            const { data, error } = await subscriptionModel.upsertSubscription({
                user_id: userId,
                tier: plan,
                stripe_id: razorpay_payment_id, // storing razorpay payment id in stripe_id column for now
                updated_at: new Date()
            });

            if (error) throw error;

            res.json({ status: 'success', subscription: data });
        } catch (err) {
            console.error('Verification DB Error:', err);
            res.status(500).json({ error: 'Payment verified but failed to update subscription' });
        }
    } else {
        res.status(400).json({ error: 'Invalid signature' });
    }
};

const getStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const { data: subscription, error } = await subscriptionModel.getSubscription(userId);

        if (error && error.code !== 'PGRST116') throw error;

        res.json({ subscription: subscription || { tier: 'free' } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const webhook = async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(body)
        .digest('hex');

    if (expectedSignature === signature) {
        const event = req.body.event;
        // Handle 'payment.captured' or others
        console.log('Razorpay Webhook Verified:', event);

        // Logic to update DB based on webhook events if decoupled from frontend verification

        res.status(200).json({ status: 'ok' });
    } else {
        res.status(400).json({ error: 'Invalid signature' });
    }
};

module.exports = {
    createOrder,
    verifyPayment,
    getStatus,
    webhook
};
