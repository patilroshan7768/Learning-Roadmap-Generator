const express = require('express');
const router = express.Router();

// --- START DEBUG BLOCK ---
// We are importing the files and then immediately logging them to the console.
const adminController = require('../controllers/adminController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const adminMiddleware = require('../middleware/adminMiddleware.js');

console.log('--- CHECKING IMPORTS ---');
console.log('Is adminController an object?', typeof adminController === 'object' && adminController !== null);
console.log('Functions in adminController:', adminController);

console.log('Is authMiddleware an object?', typeof authMiddleware === 'object' && authMiddleware !== null);
console.log('Functions in authMiddleware:', authMiddleware);

console.log('Is adminMiddleware an object?', typeof adminMiddleware === 'object' && adminMiddleware !== null);
console.log('Functions in adminMiddleware:', adminMiddleware);
console.log('------------------------');
// --- END DEBUG BLOCK ---

const { loginAdmin, getUsers, deleteUser, getOfficialRoadmaps } = adminController;
const { protect } = authMiddleware;
const { admin } = adminMiddleware;

router.post('/login', loginAdmin);
router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/roadmaps').get(protect, admin, getOfficialRoadmaps);

module.exports = router;