const express = require('express');
const { check, validationResult } = require('express-validator');
const { createExam, getExam } = require('../controllers/exams.js');

const router = express.Router();

router.post(
  '/createExam',
  [
    check('subjectName', 'Subject is required').not().isEmpty(),
    check('examType', 'Exam Type is required').not().isEmpty(),
    check('date', 'Exam Date is required').not().isEmpty(),
    check('time', 'Exam Time is required').not().isEmpty(),
    check('slot', 'Slot No is required').not().isEmpty(),
    check('room', 'Room no is required').not().isEmpty(),
    check('status', 'Status must be a string').optional().isString()
  ],
  createExam
);

router.get('/getExam', getExam);

module.exports = router;
