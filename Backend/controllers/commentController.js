const Comment = require('../models/Comment.js');

const getCommentsForRoadmap = async (req, res) => {
  try {
    const comments = await Comment.find({ roadmap: req.params.roadmapId }).populate('user', 'name').sort({ createdAt: 'desc' });
    res.json(comments);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const addCommentToRoadmap = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Comment text cannot be empty' });
  try {
    const newComment = new Comment({ text, roadmap: req.params.roadmapId, user: req.user.id });
    const savedComment = await newComment.save();
    await savedComment.populate('user', 'name');
    res.status(201).json(savedComment);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { getCommentsForRoadmap, addCommentToRoadmap };