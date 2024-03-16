const mongoose = require("mongoose");

const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("geniusGrid connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error while connecting geniusGrid", error);
    });

module.exports = connectDB;
