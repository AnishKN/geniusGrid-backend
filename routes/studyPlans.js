const express = require("express");
const { check } = require("express-validator");
const {
  createStudyPlan,
  getStudyPlans,
} = require("../controllers/studyPlans.js");

const router = express.Router();

router.post(
  "/createStudyPlan",
  [
    check("title", "Title is required").not().isEmpty(),
    check("desc", "Description is required").not().isEmpty(),
    check("dueDate", "Due Date is required").not().isEmpty(),
    check("dueTime", "Due Time is required").not().isEmpty(),
    check("category", "Category is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("progress", "Progress is required").not().isEmpty(),
  ],
  createStudyPlan
);

router.get("/getStudyPlans", getStudyPlans);

module.exports = router;
