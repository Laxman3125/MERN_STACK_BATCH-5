
const mongoose = require("mongoose");
const express = require("express");
//POST -> Create Student
//GET -> Get All Students
//GET /:id -> Get one Student
//PUT /:id -> Update Student
//DELETE /:id -> Delete Student


// create an express application
const app = express();

// middleware to convert incoming JSON data into javascript object 
app.use(express.json());

// function to connect to MongoDB database
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
        mobileNo: Number,//Number ex. 1234567890

    }
)

// model
const Student = mongoose.model("Student", studentSchema);





//req - request
//res - response

//post API - Create Student
// function to handle create student request
const addStudent = async (req, res) => {
    // start try block to handle error
    try {

          const newstdent = await Student.create(req.body);

        // send json response to the client
        res.json({ message: "Student created successfully", newstdent : newstdent });
     // catch block will run if any error occurs
    } catch (error) {
        // print error in console
        console.log(error);
    }
}

// get API - Get All Students
// function to handle get all students request
const getAllStudents = async (req, res) => {
    // start try block to handle error
    try {
        const students = await Student.find();
        // send json response to the client
        res.json({ message: "Students retrieved successfully", students });
        // catch block will run if any error occurs
    } catch (error) {
        //PRINT ERROR IN CONSOLE
        console.log(error);
    }
};

// DELETE API - Delete Student
// function to handle delete student request
const deleteStudent = async (req, res) => {
    // start try block to handle error
    try {
        
        // Get student id from URL
        const studentId = req.params._id;

        // find student by id and delete it from database
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        // send json response to the client
        res.json({ message: "Student deleted successfully",  });
        // catch block will run if any error occurs
    } catch (error) {
        //PRINT ERROR IN CONSOLE
        console.log(error);
    }
};

// PUT API - Edit Student
// function to handle edit student request
const editStudentRecord = async (req, res) => {
    // start try block to handle error
    try {
        
        // Get student id from URL
        const studentId = req.params.id;

        // Get updated student data from request body
        const studentData = req.body;

        // find student by id and update it in database
        const updatedNewData = await Student.findByIdAndUpdate(studentId, studentData, { new: true });

        if (!updatedNewData) {
            res.json({ message: "Student not found" });
        }

        // send json response to the client
        res.json({ message: "Student updated successfully", updatedNewData : updatedNewData });
        // catch block will run if any error occurs
    } catch (error) {
        //PRINT ERROR IN CONSOLE
        console.log(error);
    }
};




// create post API endpoint to create student
app.use("/create-student", addStudent );

// create get API endpoint to get all students
app.use("/get-all-students", getAllStudents );

// create delete API endpoint to delete student
app.use("/delete-student/:_id", deleteStudent );

// create put API endpoint to edit student
app.use("/edit-update-student/:id", editStudentRecord );

// print test message in console
console.log("test");

// start express server on port 9090
app.listen(9090, () => {

    // print server running message in console
    console.log("Server is running on port 9090");
})
