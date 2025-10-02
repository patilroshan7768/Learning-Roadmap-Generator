const mongoose = require('mongoose');

const progressSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap', required: true },
  completedSteps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roadmap.steps' }],
}, { timestamps: true });

// Ensure a user can only have one progress document per roadmap
progressSchema.index({ user: 1, roadmap: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);
module.exports = Progress;