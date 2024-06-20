const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  examType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  slot: { type: String, required: true },
  room: { type: String, required: true },
  status: { type: String, default: null }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
