const express = require('express');
const router = express.Router();
const { getCommentsForRoadmap, addCommentToRoadmap } = require('../controllers/commentController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/:roadmapId').get(getCommentsForRoadmap).post(protect, addCommentToRoadmap);

module.exports = router;