const RewardModel = require('../models/rewardsModel');

const getVendorRewards = async (req, res) => {
    const vendorId = req.params.vendor_id || req.user.id; // adjust if vendor is authenticated
    try {
      const rewards = await RewardModel.getVendorRewards(vendorId);
      res.json(rewards);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      res.status(500).json({ message: 'Failed to get vendor rewards' });
    }
  };

  const getAllRewards = async (req, res) => {
    try {
      const rewards = await RewardModel.getAllRewards();
      res.json(rewards);
    } catch (err) {
      console.error('Error fetching rewards:', err);
      res.status(500).json({ message: 'Failed to fetch rewards' });
    }
  };
  
 const createReward = async (req, res) => {
    try {
      const rewardData = {
        vendor_id: req.user, // assuming vendor is authenticated
        title: req.body.title,
        description: req.body.description,
        cost: req.body.cost,
        quantity: req.body.quantity,
        UsdPrice: req.body.price,
        active: true,
      };
  
      const newReward = await RewardModel.createReward(rewardData);
      res.status(201).json(newReward[0]);
    } catch (err) {
      console.error('Error creating reward:', err);
      res.status(500).json({ message: 'Failed to create reward' });
    }
  };

  module.exports = { getVendorRewards, createReward, getAllRewards};