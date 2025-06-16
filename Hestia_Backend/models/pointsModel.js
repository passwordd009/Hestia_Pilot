const db = require('../db');

class Points{
      static async getByUserId(userId) {
        return db('points').where({ user_id: userId }).first();
      }
    
      static async createForUser(userId) {
        return db('points').insert({ user_id: userId }).returning('*');
      }
    
      static async updateBalance(userId, amount) {
        return db('points')
          .where({ user_id: userId })
          .increment('balance', amount)
          .returning('*');
      }
}

module.exports = Points;