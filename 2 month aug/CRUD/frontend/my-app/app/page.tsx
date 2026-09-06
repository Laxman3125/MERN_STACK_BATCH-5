"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div>
      <h1 className="text-danger">HOC Tech</h1>

      <div className="container mt-5">
        <div className="row">

          {/* Add Form */}
          <div className="col-md-6 border p-4">
            <h3 className="text-center">Add Form</h3>

            <form>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="1234 Main St"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, studio, or floor"
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-5">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" />
                </div>

                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <select className="form-select" defaultValue="">
                    <option value="">Choose...</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Zip</label>
                  <input type="text" className="form-control" />
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkMe"
                />

                <label className="form-check-label" htmlFor="checkMe">
                  Check me out
                </label>
              </div>

              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </div>
            </form>
          </div>

          {/* List Users */}
          <div className="col-md-6 border p-4">
            <h3 className="text-center">List Users</h3>

            <hr />

            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th>User</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>Laxman</td>
                  <td>Lokare</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>Shivraj</td>
                  <td>Yadav</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>Atharv</td>
                  <td>Patil</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>4</td>
                  <td>Omkar</td>
                  <td>Kanase</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>Shubham</td>
                  <td>Pawar</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}