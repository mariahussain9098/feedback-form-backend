
const mongoose = require('mongoose');

const feedbackFormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: String, required: true }],
  publishDate: { type: Date, default: null },
  isPublished: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true }, // Assuming an Admin model exists
  batch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true }, // Link to Batch
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }, // Link to Course
  teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true } // Link to Teacher
}, { timestamps: true });

module.exports = mongoose.model('FeedbackForm', feedbackFormSchema);
