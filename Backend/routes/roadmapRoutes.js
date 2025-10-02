const express = require('express');
const router = express.Router();
const { getRoadmaps, createRoadmap, getMyRoadmaps, getRoadmapById, updateRoadmap, deleteRoadmap } = require('../controllers/roadmapController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getRoadmaps).post(protect, createRoadmap);
router.route('/myroadmaps').get(protect, getMyRoadmaps);
router.route('/:id').get(getRoadmapById).put(protect, updateRoadmap).delete(protect, deleteRoadmap);

module.exports = router;