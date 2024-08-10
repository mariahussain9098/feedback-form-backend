const Feedback = require('../models/Feedback');

const submitFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save(); // Save to the database
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error saving feedback:', error.stack || error); 
    res.status(500).json({ message: 'There was an error submitting feedback', error: error.message });
  }
};

// Get All Feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedbackData = await Feedback.find(); 
    res.json(feedbackData); 
  } catch (error) {
    console.error('Error fetching feedback data:', error.stack || error); 
    res.status(500).json({ message: 'There was an error fetching feedback data', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback, 
};
