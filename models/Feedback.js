const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  student_id: { type: String, required: true }, 
  teacher_name: { type: String, required: true }, 
  course_name: { type: String, required: true }, 
  batch_name: { type: String, required: true }, 
  overallExperience: { type: Number, min: 1, max: 5 }, 
  teachingStyle: { type: String }, // Teaching style
  engagement: { type: Number, min: 1, max: 5 }, 
  punctuality: { type: Number, min: 1, max: 5 }, 
  decorum: { type: Number, min: 1, max: 5 }, 
  facilities: { type: Number, min: 1, max: 5 }, 
  cleanliness: { type: Number, min: 1, max: 5 }, 
  suggestions: { type: String }, // Suggestions
  peerInteraction: { type: Number, min: 1, max: 5 }, 
  instructorKnowledge: { type: Number, min: 1, max: 5 }, 
  programRelevance: { type: Number, min: 1, max: 5 }, 
  recommend: { type: Boolean }, 
  created_at: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Feedback', feedbackSchema);
