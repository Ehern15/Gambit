import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function ReportIssue() {

    let navigate = useNavigate();

    const [newhelp, setReport]=useState({
        email:"",
        description:"",
    })

    const{email, description}=newhelp;

    const onInputChange= (e) => {
        setReport({...newhelp,[e.target.name]:e.target.value})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/help_table", newhelp);
        navigate("/");
    };

    return <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className="text-center m-4">Report Issue</h2>

                <form method="POST" onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">
                            E-mail
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your email"
                            name="email"
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FirstName" className="form-label">
                            Description of Issue
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter a description of your issue"
                            name="description"
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                    <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
                </form>
            </div>
        </div>
    </div>;
}