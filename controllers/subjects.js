const { validationResult } = require('express-validator');
const Subject = require('../models/Subject');

const createSubject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { subName, teacher, color, desc, status } = req.body;

  try {
    const newSubject = new Subject({ subName, teacher, color, desc, status });
    await newSubject.save();
    res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  createSubject,
  getSubjects,
};
