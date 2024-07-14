const { validationResult } = require("express-validator");
const Settings = require("../models/settings");

// Create a new setting
const createSettings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { allowNotification, studentId } = req.body;

  try {
    const newSettings = new Settings({
      allowNotification,
      studentId,
    });

    await newSettings.save();
    res.status(201).json({
      message: "Settings created successfully",
      settings: newSettings,
    });
  } catch (error) {
    console.log("Error saving settings: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get all settings
const getAllSettings = async (req, res) => {
  try {
    const settings = await Settings.find();
    res.status(200).json(settings);
  } catch (error) {
    console.log("Error fetching settings: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get settings by ID
const getSettingsById = async (req, res) => {
  try {
    const settings = await Settings.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    res.status(200).json(settings);
  } catch (error) {
    console.log("Error fetching settings: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update settings
const updateSettings = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { allowNotification, studentId } = req.body;

  try {
    let settings = await Settings.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    settings.allowNotification = allowNotification;
    settings.studentId = studentId;

    await settings.save();
    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.log("Error updating settings: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete settings
const deleteSettings = async (req, res) => {
  try {
    const settings = await Settings.findById(req.params.id);
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }

    await settings.remove();
    res.status(200).json({ message: "Settings deleted successfully" });
  } catch (error) {
    console.log("Error deleting settings: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createSettings,
  getAllSettings,
  getSettingsById,
  updateSettings,
  deleteSettings,
};
