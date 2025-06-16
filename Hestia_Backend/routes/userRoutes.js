const express = require('express');
const router = express.Router();
const {getMe, getUserTransactions, getUserPoints, scanQRCode} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware');

router.get('/me', protect, getMe);
router.get('/points', protect, getUserPoints);
router.get('/transactions', protect, getUserTransactions);
router.post('/scan', scanQRCode);

module.exports = router;