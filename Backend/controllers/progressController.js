const Progress = require('../models/Progress.js');
const mongoose = require('mongoose');

const getProgress = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.roadmapId)) {
      return res.status(400).json({ message: 'Invalid Roadmap ID' });
    }
    const progress = await Progress.findOne({ user: req.user.id, roadmap: req.params.roadmapId });
    if (!progress) {
      return res.json({ completedSteps: [] });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateProgress = async (req, res) => {
  const { completedSteps } = req.body;
  const { roadmapId } = req.params;
  try {
    const progress = await Progress.findOneAndUpdate(
      { user: req.user.id, roadmap: roadmapId },
      { completedSteps: completedSteps.map(step => new mongoose.Types.ObjectId(step)) },
      { new: true, upsert: true }
    );
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getProgress, updateProgress };