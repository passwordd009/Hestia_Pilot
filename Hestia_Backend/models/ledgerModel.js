// models/LedgerModel.js
const db = require('../db');

class LedgerModel {
  static async logTransaction({ user_id, vendor_id, amount, type, description }) {
    return await db('ledger')
      .insert({ user_id, vendor_id, amount, type, description })
      .returning('*');
  }

  static async getUserTransactions(user_id) {
    return await db('ledger').where({ user_id }).orderBy('created_at', 'desc');
  }

  static async getVendorTransactions(vendor_id) {
    return await db('ledger').where({ vendor_id }).orderBy('created_at', 'desc');
  }

  static async getTotalEarned(user_id) {
    const result = await db('ledger')
      .where({ user_id, type: 'earn' })
      .sum('amount as total');
    return result[0].total || 0;
  }

  static async getTotalSpent(user_id) {
    const result = await db('ledger')
      .where({ user_id, type: 'spend' })
      .sum('amount as total');
    return result[0].total || 0;
  }

  static async getBalance(user_id) {
    const result = await db('ledger')
      .where({ user_id })
      .sum('amount as balance');
    return result[0].balance || 0;
  }
}

module.exports = LedgerModel;
