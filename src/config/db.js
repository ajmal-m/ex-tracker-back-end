const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;


module.exports.connectToDB = async() => {
    try {
        const conn = await mongoose.connect(MONGO_URL );
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.log("Error While connecting mongoose ",error);
    }
}
