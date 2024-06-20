const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
require("dotenv").config();

//import routes
const studentsRouter = require("./routes/students");
const subjectsRouter = require("./routes/subjects");
const examsRouter = require("./routes/exams");
const studyPlansRouter = require("./routes/studyPlans.js");
const eventsRouter = require("./routes/events.js");

connectDB();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

// use routes
app.use("/students/", studentsRouter);
app.use("/subjects/", subjectsRouter);
app.use("/exams/", examsRouter);
app.use("/studyPlans/", studyPlansRouter);
app.use("/events/", eventsRouter);

app.listen(port, () => {
  console.log(`geniusGrid Server is running`);
});
