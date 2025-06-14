const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json()); 
app.use(cors({
    origin: '*'
  }));

//test route
app.get('/test', (req, res) => {
  res.send('Backend is running!');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
