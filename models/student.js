const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Student Schema
const StudentSchema = new Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  phone_number: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
  },
  profile_pic_url: {
    type: String,
    default: null,
  },
  // Additional Information
  shortTermGoals: {
    type: String,
  },
  longTermGoals: {
    type: String,
  },
  // Preferred Subjects
  preferredSubjects: [
    {
      subjectName: {
        type: String,
        required: true,
      },
      priority: {
        type: Number,
        default: 1,
      },
    },
  ],
  // Study Preferences
  preferredStudyTimes: [
    {
      dayOfWeek: {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
      timeOfDay: {
        type: String,
        required: true,
      },
    },
  ],
  studyEnvironment: {
    type: String,
  },
  learningMaterials: {
    type: String,
  },
  // Constraints
  availability: {
    type: String,
  },
  timeConstraints: {
    type: String,
  },
  // Learning Style
  learningStyle: {
    type: String,
    enum: ["Visual", "Auditory", "Kinesthetic"],
  },
  learningPace: {
    type: String,
  },
  // Progress Tracking
  progressTracking: {
    frequency: {
      type: String,
      default: "Weekly",
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  // Additional Information
  additionalInfo: {
    type: String,
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
