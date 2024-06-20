const { validationResult } = require('express-validator');
const Event = require('../models/Event.js');

// Function to create a new event
const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, type, date, time, venue, status, desc } = req.body;

  try {
    const newEvent = new Event({ name, type, date, time, venue, status, desc });
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Function to get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  createEvent,
  getEvents,
};
