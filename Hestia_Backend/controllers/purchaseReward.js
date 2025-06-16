const RewardModel = require('../models/rewardsModel');
const RewardCodeModel = require('../models/RewardCodeModel')
const RedemptionModel =  require("../models/RedemptionModel")
const { v4: uuidv4 } = require('uuid');

const purchaseReward = async (req, res) => {
  const user_id = req.user;
  const { reward_id } = req.body;
  

  try {
    
    const reward = await RewardModel.getById(reward_id);
    

    if (!reward || reward.quantity <= 0) return res.status(404).json({ message: 'Reward not available' });
   

   
   const redeem = await RewardModel.redeemReward({user_id, reward_id});



    // Generate and store reward code
    const code = uuidv4().split('-')[0].toUpperCase();
    const rewardCode = await RewardCodeModel.create({
      user_id,
      reward_id,
      code
    });

    await RedemptionModel.create({
        user_id: user_id,
        reward_id: reward_id,
        vendor_id: reward.vendor_id,
        code: rewardCode.code,
      });

    res.status(201).json({ message: 'Reward purchased', code: rewardCode.code });
  } catch (err) {
    console.error('Error purchasing reward:', err);
    res.status(500).json({ message: 'Could not purchase reward' });
  }
};

module.exports = {purchaseReward};