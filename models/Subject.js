const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  subName: { type: String, required: true },
  teacher: { type: String, required: true },
  color: { type: String, required: true },
  desc: { type: String, required: true },
  status: { type: String, default: null }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
