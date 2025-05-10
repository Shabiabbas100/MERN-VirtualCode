// Load environment variables from .env file
require('dotenv').config();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};