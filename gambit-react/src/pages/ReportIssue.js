import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

export default function ReportIssue() {

    let navigate = useNavigate();

    const [user, setUser]=useState({
        email:"",
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        photos:"",

    })

    const{email, firstName, lastName, username, password, photos}=user;

    const onInputChange= (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user);
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
                            value={email}
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FirstName" className="form-label">
                            First Name
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your first name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="LastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your last name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Username" className="form-label">
                            Username
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="Enter your username"
                            name="username"
                            value={username}
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">
                            Password
                        </label>
                        <input
                            type={"password"}
                            className="form-control"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={(e) => onInputChange(e)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">
                            Photos:
                        </label>

                    </div>
                    <button type="submit" className="btn btn-outline-success">Submit</button>
                    <Link className="btn btn-outline-danger mx-2" to="/login">Cancel</Link>
                </form>
            </div>
        </div>
    </div>;
}