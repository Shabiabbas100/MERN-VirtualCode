// Load environment variables from .env file
require('dotenv').config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Use the MONGO_URI environment variable for the connection string
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("MongoDB connected to Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectDB;
