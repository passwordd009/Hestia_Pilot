const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { register, login, logout} = require("../controllers/authController");
const protect = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', protect, (req, res) => {
  res.send(`You are user ID: ${req.user}`);
});

module.exports = router;

