
const mongoose = require("mongoose");
const express = require("express");
//POST -> Create Student
//GET -> Get All Students
//GET /:id -> Get one Student
//PUT /:id -> Update Student
//DELETE /:id -> Delete Student

const app = express();

app.use(express.json());

const connectDB = async () => {

    try {
     await mongoose.connect("mongodb://localhost:27017/month-2-crud");

        console.log("Connected to MongoDB");

    } catch (error) {
        console.log(error);
    }


}


connectDB()


//==============
// schema => Model => Collection => Table => Table data === (perticular One Record => Document)
// Student Schema

const studentSchema = new mongoose.Schema(
    {
        name: String,// Text
        age: Number,// Number ex. 20, 30, 40
        city: String,//String ext ex. Karad pune
        mobileNo: String,//Number ex. 1234567890

    }
)

// model
const Student = mongoose.model("Student", studentSchema);





//req - request
//res - response
//post API - Create Student
const addStudent = async (req, res) => {
    try {

          const newstdent = await Student.create(req.body);

        res.json({
            message: "Student created successfully", newstdent : newstdent });

    } catch (error) {
        console.log(error);
    }
}

app.post("/create-student", addStudent );


console.log("test");

app.listen(9090, () => {
    console.log("Server is running on port 9090");
})
