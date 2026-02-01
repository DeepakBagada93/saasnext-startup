
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/webhook', subscriptionController.webhook);

router.use(authMiddleware);

router.post('/create-order', subscriptionController.createOrder); // Replaced create-checkout-session
router.post('/verify-payment', subscriptionController.verifyPayment);
router.get('/', subscriptionController.getStatus);

module.exports = router;
