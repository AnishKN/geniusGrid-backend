const { validationResult } = require('express-validator');
const Exam = require('../models/exam');

const createExam = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { subjectName, examType, date, time, slot, room, status } = req.body;

  try {
    const newExam = new Exam({ subjectName, examType, date, time, slot, room, status });
    await newExam.save();
    res.status(201).json({ message: 'Exam added successfully', exam: newExam });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getExam = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  createExam,
  getExam,
};
