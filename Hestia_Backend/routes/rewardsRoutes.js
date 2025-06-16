const express = require('express');
const router = express.Router();
const {getVendorRewards, createReward } = require('../controllers/rewardsController');
const { redeemCode } = require('../controllers/redemptionController')
const { purchaseReward } = require('../controllers/purchaseReward')
const protect = require('../middleware/authMiddleware');

router.get('/:vendor_id', getVendorRewards);
router.put('/redeem', redeemCode)
router.put('/purchase', protect, purchaseReward)
router.post('/create', protect, createReward);


module.exports = router;