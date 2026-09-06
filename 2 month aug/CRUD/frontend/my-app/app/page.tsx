"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Home() {
  type Student = {
    name: string;
    age: number;
    mobileNo: string;
    city: string;
  };

  const [data, setData] = useState<Student[]>([]);

  const getStudentData = async () => {
    const apiData = await fetch("http://localhost:9090/get-all-students");
    const response = await apiData.json();

    setData(response.students ?? []);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  return (
    <div>
      <h1 className="text-danger text-center my-5">Student Management</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 border border-1 py-5">
            <h1 className="text-center my-5">Add Student</h1>

            <div className="">
              <Form className=" mx-5">
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter full name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="text" placeholder="Enter age" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter mobile number" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter city" />
                </Form.Group>

                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="col-md-6 border border-1 py-5">
            <h1 className="text-center my-5">View Student</h1>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Age</th>
                  <th>Mobile Number</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
               {
                data && data.map((ele,index) => {
                  return (
                    <tr> 
                      <td> {index + 1} </td>
                      <td> {ele.name} </td>
                      <td> {ele.age} </td>
                      <td> {ele.mobileNo} </td>
                      <td> {ele.city} </td>
                    </tr>

              
                  )
                })
               }

              </tbody>
            </Table>
          </div>

        </div>
      </div>
    </div>
  );
}
function data(prevState: undefined): undefined {
  throw new Error("Function not implemented.");
}

