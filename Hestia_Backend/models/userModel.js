const db = require('../db');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

class UserModel {
  static async create({ first_name, last_name, email, password }) {

    const qr_code = uuidv4();

    // Optional: create QR image data URL
    const qr_url = await QRCode.toDataURL(qr_code);
    

    return await db('users')
      .insert({ first_name, last_name, email, password, qr_code, qr_url})
      .returning('*');
  }

  static async findByEmail(email) {
    const user = await db('users').where({ email }).first();
    return user;
  }

  static async findById(id) {
    return await db('users').where({ id }).first();
  }

  static async findByQRCode(qr_code) {
    return await db('users').where({ qr_code }).first();
  }
}

module.exports = UserModel;
