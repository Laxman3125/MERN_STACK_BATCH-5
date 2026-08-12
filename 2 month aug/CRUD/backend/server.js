
const mongoose = require("mongoose");

const connectDB = async () => {

    try {
     await mongoose.connect("mongodb://localhost:27017/month-2-crud");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }

    console.log("Hello");
}


connectDB()