const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongodb");
require('dotenv').config();

//import routes
const studentsRouter = require('./routes/students');
const subjectsRouter = require('./routes/subjects');

connectDB();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use('/students/', studentsRouter);
app.use('/subjects/', subjectsRouter);

app.listen(port, () => {
  console.log(`geniusGrid Server is running on http://localhost:${port}`);
});
