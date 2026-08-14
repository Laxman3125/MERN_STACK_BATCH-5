
const mongoose = require("mongoose");
//POST -> Create Student
//GET -> Get All Students
//GET /:id -> Get one Student
//PUT /:id -> Update Student
//DELETE /:id -> Delete Student

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