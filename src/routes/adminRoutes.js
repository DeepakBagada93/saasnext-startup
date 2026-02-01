
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Add specific admin check middleware here
const adminCheck = (req, res, next) => {
    // Implement admin check logic
    // if (req.user.role !== 'admin') return res.sendStatus(403);
    next();
};

router.use(authMiddleware);
router.use(adminCheck);

router.get('/dashboard', adminController.dashboard);

module.exports = router;
