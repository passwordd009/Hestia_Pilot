const db = require('../db');
const { nanoid } = require('nanoid'); // to generate secure random codes

const RewardCodeModel = {
  async create(user_id, reward_id) {
    const code = nanoid(10); 
    const [entry] = await db('reward_codes')
      .insert({ user_id, reward_id, code })
      .returning('*');
    return entry;
  },

  async findByCode(code) {
    return db('reward_codes').where({ code }).first();
  },

  async markAsUsed(code) {
    return db('reward_codes')
      .where({ code })
      .update({ used: true, used_at: new Date() });
  }
};

module.exports = RewardCodeModel;
