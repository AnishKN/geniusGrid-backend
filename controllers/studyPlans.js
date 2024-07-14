const { validationResult } = require("express-validator");
const StudyPlan = require("../models/StudyPlan.js");

const createStudyPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors: ", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, desc, dueDate, dueTime, category, status, progress, studentId } = req.body;

  try {
    const newStudyPlan = new StudyPlan({
      title,
      desc,
      dueDate,
      dueTime,
      category,
      status,
      progress,
      studentId,
    });

    await newStudyPlan.save();
    res.status(201).json({
      message: "Study plan added successfully",
      studyPlan: newStudyPlan,
    });
  } catch (error) {
    console.log("Error saving study plan: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

const getStudyPlans = async (req, res) => {
  try {
    const studyPlans = await StudyPlan.find();
    res.status(200).json(studyPlans);
  } catch (error) {
    console.log("Error fetching study plans: ", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  createStudyPlan,
  getStudyPlans,
};
