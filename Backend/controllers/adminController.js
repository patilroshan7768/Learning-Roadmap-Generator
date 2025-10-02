const User = require('../models/User.js');
const Roadmap = require('../models/Roadmap.js');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && user.isAdmin && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' }),
    });
  } else {
    res.status(401).json({ message: 'Invalid admin credentials' });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const getOfficialRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ isOfficial: true }).populate('user', 'name email');
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { loginAdmin, getUsers, deleteUser, getOfficialRoadmaps };