const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Route for submitting feedback
router.post('/feedback', feedbackController.submitFeedback);

// Route for fetching all feedback
router.get('/feedback', feedbackController.getAllFeedback); // Add this line

module.exports = router;


