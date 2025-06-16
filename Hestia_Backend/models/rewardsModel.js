const db = require('../db');

class RewardModel {
  // Get all active rewards for a specific vendor
  static async getVendorRewards(vendor_id) {
    return db('rewards').where({ vendor_id, active: true });
  }

  static async getAllRewards() {
    return db('rewards').where({ active: true });
  }  

  // Create a new reward
  static async createReward(reward) {
    return db('rewards').insert(reward).returning('*');
  }

  static async getById(id){
    return db('rewards').where( {id} ).first()
  }

  // Redeem a reward
  static async redeemReward({ user_id, reward_id }) {
    
    const reward = await db('rewards').where({ id: reward_id }).first();
    if (!reward) throw new Error('Reward not found');

    const vendor_id = reward.vendor_id;
    if (!vendor_id) throw new Error('Vendor ID missing from reward');

    // Check points balance
    const userPoints = await db('points').where({ user_id }).first();
    const balance = userPoints?.balance ?? 0;
    if (balance < reward.cost) return null;

    // Deduct points from points table
    await db('points')
      .where({ user_id })
      .decrement('balance', reward.cost);

    // Log the deduction in the ledger
    await db('ledger').insert({
      user_id,
      vendor_id: vendor_id,
      amount: -reward.cost,
      type: 'spend',
      description: `Redeemed: ${reward.title}`
    });

    // Decrease available reward quantity
    await db('rewards')
      .where({ id: reward_id })
      .decrement('quantity', 1);
    
    return reward;
  }
}

module.exports = RewardModel;
