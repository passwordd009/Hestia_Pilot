const Points = require('../models/pointsModel');

// Get user's current point record
const getUserPoints = async (req, res) => {
  try {
    const points = await Points.getByUserId(req.user);
    if (!points) return res.status(404).json({ message: 'Points record not found' });
    res.json(points);
  } catch (err) {
    console.error('Error getting points:', err);
    res.status(500).json({ message: 'Server error retrieving points' });
  }
};

// Create a points record for new users
const createUserPoints = async (req, res) => {
  try {
    const newPoints = await Points.createForUser(req.user);
    res.status(201).json(newPoints[0]);
  } catch (err) {
    console.error('Error creating points record:', err);
    res.status(500).json({ message: 'Failed to create points record' });
  }
};

module.exports = {
  getUserPoints,
  createUserPoints,
};