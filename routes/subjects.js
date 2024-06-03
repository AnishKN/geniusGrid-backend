const express = require('express');
const { check, validationResult } = require('express-validator');
const { createSubject, getSubjects } = require('../controllers/subjects');

const router = express.Router();

router.post(
  '/createSubject',
  [
    check('subName', 'Subject name is required').not().isEmpty(),
    check('teacher', 'Teacher is required').not().isEmpty(),
    check('color', 'Color is required').not().isEmpty(),
    check('desc', 'Description is required').not().isEmpty(),
    check('status', 'Status must be a string').optional().isString()
  ],
  createSubject
);

router.get('/getSubjects', getSubjects);

module.exports = router;
