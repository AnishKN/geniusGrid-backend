const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  allowNotification: { type: Boolean, default: false, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true }
});

const settings = mongoose.model('settings', settingsSchema);

module.exports = settings;
