const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.CONNECTION_URI);
  console.log("Tasks DB connected");
};

module.exports = connectDB;