const ActivityModel = require('../models/ActivityModel')
const LedgerModel = require('../models/ledgerModel');
const Points = require('../models/pointsModel');


const createActivity = async (req, res) =>{
    const { title, description, points } = req.body;
  try {
    const activity = await ActivityModel.createActivity({ title, description, points });
    res.status(201).json(activity);
  } catch (err) {
    console.error('Error creating activity:', err);
    res.status(500).json({ message: 'Failed to create activity' });
  }
}

const getAllActivities = async (req, res) => {
    try {
        const activities = await ActivityModel.getAllActivities();
        res.json(activities);
      } catch (err) {
        console.error('Error fetching activities:', err);
        res.status(500).json({ message: 'Failed to fetch activities' });
      }
}

const completeActivity = async (req, res) => {
  const { user_id, activity_id } = req.body;

  try {
    const activity = await ActivityModel.findById(activity_id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    const points = activity.points || 0;

    // Update points table
    await Points.updateBalance(user_id, points);

    // Log in ledger
    await LedgerModel.logTransaction({
      user_id,
      vendor_id: null,
      amount: points,
      type: 'earn',
      description: `Completed activity: ${activity.title}`
    });

    res.json({ message: 'Points awarded', amount: points });
  } catch (err) {
    console.error('Error awarding points:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

 const deactivateActivity = async (req, res) => {
    const { id } = req.params;
    try {
      await ActivityModel.deactivate(id);
      res.json({ message: 'Activity deactivated' });
    } catch (err) {
      console.error('Error deactivating activity:', err);
      res.status(500).json({ message: 'Failed to deactivate activity' });
    }
  };

 const deleteActivity = async (req, res) => {
    const { id } = req.params;
  
    try {
      await ActivityModel.deleteActivity(id);
      res.json({ message: 'Activity deleted successfully' });
    } catch (err) {
      console.error('Error deleting activity:', err);
      res.status(500).json({ message: 'Failed to delete activity' });
    }
  };

  module.exports = { createActivity, getAllActivities, completeActivity, deactivateActivity, deleteActivity };