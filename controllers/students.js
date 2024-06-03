const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const Student = require('../models/student');

// POST /api/students/register
// Register a new student
const studentRegister = router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 8 or more characters').isLength({ min: 8 }),
    check('confirmPassword', 'Passwords do not match').custom((value, { req }) => value === req.body.password),
    check('phone_number', 'Please enter a valid 10-digit phone number').isLength({ min: 10, max: 10 }).isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, phone_number, profile_pic_url } = req.body;

    try {
      let student = await Student.findOne({ email });

      if (student) {
        return res.status(400).json({ errors: [{ msg: 'Student already exists' }] });
      }

      // Construct the document to be saved
      const studentFields = {
        name,
        email,
        password,
        phone_number,
        profile_pic_url,
        shortTermGoals: null,
        longTermGoals: null,
        preferredSubjects: null,
        preferredStudyTimes: null,
        studyEnvironment: null,
        learningMaterials: null,
        availability: null,
        timeConstraints: null,
        learningStyle: null,
        learningPace: null,
        progressTracking: null,
        additionalInfo: null
      };

      student = new Student(studentFields);

      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

      await student.save();

      res.json({ msg: 'Student registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// POST /api/students/login
// Authenticate student and get token
const studentLogin = router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let student = await Student.findOne({ email });

      if (!student) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, student.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        student: {
          id: student.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = {
  studentRegister,
  studentLogin
};
