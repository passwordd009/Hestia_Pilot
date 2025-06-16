const db = require('../db');

class RewardCodeModel {
  // Create a reward code entry
  static async create({ user_id, reward_id, code }) {
    const [inserted] = await db('reward_codes')
      .insert({ user_id, reward_id, code })
      .returning('*');
    return inserted;
  }

  // Find a code by its string
  static async findByCode(code) {
    return await db('reward_codes')
      .where({ code })
      .first();
  }

  // Mark code as used
  static async markAsUsed(id) {
    return await db('reward_codes')
      .where({ id })
      .update({
        used: true,
        used_at: db.fn.now()
      })
      .returning('*');
  }

  // Get all unredeemed codes for a user
  static async getActiveCodesByUser(user_id) {
    return await db('reward_codes')
      .where({ user_id, used: false });
  }

  // Optional: list all codes for a vendor's rewards
  static async getCodesByVendor(vendor_id) {
    return await db('reward_codes')
      .join('rewards', 'reward_codes.reward_id', 'rewards.id')
      .where('rewards.vendor_id', vendor_id)
      .select('reward_codes.*', 'rewards.title');
  }
}

module.exports = RewardCodeModel;
