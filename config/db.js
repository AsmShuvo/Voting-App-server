const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("DB connection error", error);
    process.exit(1);
  }
};

module.exports = { connectDB };
