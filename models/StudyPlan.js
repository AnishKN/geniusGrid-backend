const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  dueDate: { type: String, required: true },
  dueTime: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, required: true, default: "" },
  progress: { type: String, required: true, default: "" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }
});

const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);

module.exports = StudyPlan;
