const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const VendorModel = require('../models/vendorModel');
require('dotenv').config();

const generateToken = (vendorId) => {
  return jwt.sign({ id: vendorId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (req, res) => {
  const { business_name, first_name, last_name, email, password } = req.body;

  try {
    const existingVendor = await VendorModel.findByEmail(email);
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newVendor] = await VendorModel.create({
      business_name,
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newVendor.id);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Vendor Register Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await VendorModel.findByEmail(email);
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(vendor.id);
    res.json({ token });
  } catch (err) {
    console.error('Vendor Login Error:', err);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const vendor = await VendorModel.findByEmail(email);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);

    await VendorModel.saveResetToken(vendor.id, hashedToken, expires);

    const resetUrl = `http://localhost:3000/reset-password?vendor=true&token=${resetToken}`;
    console.log(`Vendor Reset URL: ${resetUrl}`);

    res.json({ message: 'Reset link sent (check console)' });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    res.status(500).json({ message: 'Error sending reset token' });
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
};
