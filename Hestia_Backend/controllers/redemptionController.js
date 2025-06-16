const RedemptionModel = require('../models/RedemptionModel');
const RewardCodeModel = require('../models/RewardCodeModel');

const redeemCode = async (req, res) => {
  const { code } = req.body;

  try {
    const codeEntry = await RewardCodeModel.findByCode(code);
    if (!codeEntry || codeEntry.used) {
      return res.status(400).json({ message: 'Invalid or already used code' });
    }

    await RewardCodeModel.markAsUsed(codeEntry.id);
    const redemption = await RedemptionModel.redeem(codeEntry.code);
    console.log(redemption)
   
    // You can calculate discount/savings here if needed

    res.json({
      message: 'Reward redeemed successfully',
      redemption
    });

  } catch (err) {
    console.error('Redemption error:', err);
    res.status(500).json({ message: 'Server error during redemption' });
  }
};

module.exports = {redeemCode};
