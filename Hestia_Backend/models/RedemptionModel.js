const db = require('../db');

class RedemptionModel {
  // Create a redemption entry (optional, you may handle everything in reward_codes)
  static async create({ user_id, vendor_id, reward_id, code }) {
    const [redemption] = await db('reward_redemptions')
      .insert({
        user_id,
        vendor_id,
        reward_id,
        code,
        status: 'pending',
      })
      .returning('*');
    return redemption;
  }

  // Find a redemption record by code
  static async findByCode(code) {
    return await db('reward_redemptions')
      .where({ code })
      .first();
  }

  // Vendor validates and confirms redemption
  static async redeem(code) {
    console.log(code)
    const exists = await db('reward_redemptions').where({ code }).first();
   if (!exists) return null; // or throw an error

    const [updated] = await db('reward_redemptions')
      .where({ code })
      .update({
        status: 'redeemed',
        redeemed_at: db.fn.now(),
      })
      .returning('*');
      
    return updated;
  }

  // Cancel a redemption (if needed)
  static async cancel(code) {
    return await db('reward_redemptions')
      .where({ code })
      .update({
        status: 'cancelled',
      });
  }

  // Get all redemptions by vendor
  static async getByVendor(vendor_id) {
    return await db('reward_redemptions')
      .where({ vendor_id })
      .orderBy('created_at', 'desc');
  }

  // Get all redemptions by user
  static async getByUser(user_id) {
    return await db('reward_redemptions')
      .where({ user_id })
      .orderBy('created_at', 'desc');
  }
}

module.exports = RedemptionModel;
