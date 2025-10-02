const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const stepSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  resources: [resourceSchema],
});

const roadmapSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  topic: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String },
  isOfficial: { type: Boolean, default: false },
  steps: [stepSchema],
}, { timestamps: true });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
module.exports = Roadmap;