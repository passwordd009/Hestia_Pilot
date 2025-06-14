const db = require('../db');

class UserModel {
  static async create({ first_name, last_name, email, password }) {
    return await db('users')
      .insert({ first_name, last_name, email, password })
      .returning('*');
  }

  static async findByEmail(email) {
    const user = await db('users').where({ email }).first();
    return user;
  }

  static async findById(id) {
    return await db('users').where({ id }).first();
  }
}

module.exports = UserModel;
