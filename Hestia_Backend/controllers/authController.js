const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
require('dotenv').config();

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}
const register = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;

  try {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await UserModel.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser.id);
    res.status(201).json({token})
   } catch (error){

    console.error('Register error:', error);
    res.status(500).json({ message: 'Internal server error' });

   }
}

const logout = (req, res) => {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  const login = async (req, res) => {
    const { email, password } = req.body;
  
    const existingUser = await UserModel.findByEmail(email);
    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = generateToken(existingUser.id);
    res.json({ token });
  };

module.exports = { register, login, logout};