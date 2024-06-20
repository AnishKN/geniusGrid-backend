const express = require('express');
const { check } = require('express-validator');
const { createEvent, getEvents } = require('../controllers/events.js');

const router = express.Router();

router.post(
  '/createEvent',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('date', 'Date is required').not().isEmpty(),
    check('time', 'Time is required').not().isEmpty(),
    check('venue', 'Venue is required').not().isEmpty(),
    check('status', 'Status is required').not().isEmpty(),
    check('desc', 'Description is required').not().isEmpty(),
  ],
  createEvent
);

router.get('/getEvents', getEvents);

module.exports = router;
