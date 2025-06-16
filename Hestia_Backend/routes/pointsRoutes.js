const express = require('express');
const router = express.Router();
const {getUserPoints, createUserPoints} = require('../controllers/pointsController')
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getUserPoints);
router.post('/create', protect, createUserPoints);

module.exports = router;
