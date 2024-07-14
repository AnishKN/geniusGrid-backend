const express = require("express");
const { check } = require("express-validator");
const {
  createSettings,
  getAllSettings,
  getSettingsById,
  updateSettings,
  deleteSettings,
} = require("../controllers/settings.js");

const router = express.Router();

router.post(
  "/",
  [
    check("allowNotification", "Allow Notification is required").not().isEmpty().isBoolean(),
    check("studentId", "Student ID is required").not().isEmpty().isMongoId(),
  ],
  createSettings
);

router.get("/", getAllSettings);

router.get("/:id", getSettingsById);

router.put(
  "/:id",
  [
    check("allowNotification", "Allow Notification is required").not().isEmpty().isBoolean(),
    check("studentId", "Student ID is required").not().isEmpty().isMongoId(),
  ],
  updateSettings
);

router.delete("/:id", deleteSettings);

module.exports = router;
