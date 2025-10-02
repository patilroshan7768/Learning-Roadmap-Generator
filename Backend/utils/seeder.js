const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User.js');
const Roadmap = require('../models/Roadmap.js');
const roadmapsData = require('../data/roadmaps.js');
const connectDB = require('../config/db.js');

dotenv.config();

const importRoadmaps = async () => {
  try {
    await connectDB();
    const adminUser = await User.findOne({ isAdmin: true });
    if (!adminUser) {
      console.error('ERROR: Admin user not found! Please run "npm run data:admin" first.');
      process.exit(1);
    }
    await Roadmap.deleteMany({ isOfficial: true });
    const officialRoadmaps = roadmapsData.map(roadmap => ({
      ...roadmap,
      user: adminUser._id,
      isOfficial: true,
    }));
    await Roadmap.insertMany(officialRoadmaps);
    console.log('✅ Official Roadmaps Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error importing roadmaps: ${error}`);
    process.exit(1);
  }
};

const resetAdmin = async () => {
  try {
    await connectDB();
    await User.deleteOne({ email: 'admin@example.com' });
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'adminpassword123',
      isAdmin: true,
    });
    await adminUser.save();
    console.log('✅ Admin User Reset Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error resetting admin: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '--admin') {
  resetAdmin();
} else {
  importRoadmaps();
}