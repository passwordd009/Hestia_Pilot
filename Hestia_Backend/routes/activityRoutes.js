const express = require('express');
const router = express.Router();
const { createActivity, getAllActivities, completeActivity, deactivateActivity, deleteActivity} = require("../controllers/activityController");

router.post('/create', createActivity);
router.get('/retrieve', getAllActivities);
router.patch('/:id/deactivate', deactivateActivity);
router.delete('/:id', deleteActivity);
router.post('/complete', completeActivity);

module.exports = router;