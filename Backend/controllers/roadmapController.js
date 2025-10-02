const Roadmap = require('../models/Roadmap.js');
const mongoose = require('mongoose');

const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ isOfficial: true });
    res.json(roadmaps);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const getMyRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ user: req.user.id, isOfficial: false });
    res.json(roadmaps);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const getRoadmapById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (roadmap) res.json(roadmap);
    else res.status(404).json({ message: 'Roadmap not found' });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};

const createRoadmap = async (req, res) => {
  const { topic, category, description, steps } = req.body;
  try {
    const isOfficial = req.user.isAdmin;
    const roadmap = await Roadmap.create({ user: req.user.id, topic, category, description, steps: steps || [], isOfficial });
    res.status(201).json(roadmap);
  } catch (error) { res.status(400).json({ message: 'Please add all required fields' });}
};

const updateRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    const isOwner = roadmap.user.toString() === req.user.id;
    const isAdmin = req.user.isAdmin;
    const canModify = (isAdmin && roadmap.isOfficial) || (isOwner && !roadmap.isOfficial);
    if (!canModify) return res.status(401).json({ message: 'User not authorized' });
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRoadmap);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });
    const isOwner = roadmap.user.toString() === req.user.id;
    const isAdmin = req.user.isAdmin;
    const canDelete = (isAdmin && roadmap.isOfficial) || (isOwner && !roadmap.isOfficial);
    if (!canDelete) return res.status(401).json({ message: 'User not authorized' });
    await roadmap.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

module.exports = { getRoadmaps, createRoadmap, getMyRoadmaps, getRoadmapById, updateRoadmap, deleteRoadmap };