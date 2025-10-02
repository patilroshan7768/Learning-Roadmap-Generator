const express = require('express');
const router = express.Router();
const { getProgress, updateProgress } = require('../controllers/progressController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/:roadmapId').get(protect, getProgress).post(protect, updateProgress);

module.exports = router;