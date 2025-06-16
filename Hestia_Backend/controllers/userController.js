const UserModel = require('../models/userModel')
const db = require('../db');

const getUserTransactions = async (req, res) => {
  try {
    const transactions = await db('ledger')
      .where({ user_id: req.user })
      .orderBy('created_at', 'desc');

    res.json(transactions);
  } catch (err) {
    console.error('Error fetching user transactions:', err);
    res.status(500).json({ message: 'Failed to retrieve transactions' });
  }
  };

  const getMe = async (req, res) => {
    const user = await UserModel.findById(req.user); // req.user set by middleware
    res.json(user);
  };
  
  const getUserPoints = async (req, res) => {
    const result = await db('ledger')
      .where({ user_id: req.user })
      .sum('amount as balance');
  
    const balance = result[0].balance || 0;
    res.json({ points: balance });
  };

 const scanQRCode = async (req, res) => {
    const { qr_code } = req.body;
  
    try {
      const user = await UserModel.findByQRCode(qr_code);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Award points or return user info
      res.json({ user });
    } catch (err) {
      console.error('QR scan error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { getMe, getUserTransactions, getUserPoints, scanQRCode }