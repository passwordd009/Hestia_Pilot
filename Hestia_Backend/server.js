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

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const rewardRoutes = require('./routes/rewardsRoutes');
app.use('/api/rewards', rewardRoutes)

const activtiyRoutes =  require('./routes/activityRoutes');
app.use('/api/activities', activtiyRoutes);

const pointsRoutes = require('./routes/pointsRoutes');
app.use('/api/points', pointsRoutes)

const userRoutes =  require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const vendorRoutes = require('./routes/vendorRoutes');
app.use('/api/vendor', vendorRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
