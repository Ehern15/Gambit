import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams  } from "react-router-dom";
import DashMenu from "../layout/DashMenu";

export default function EditUser() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser]=useState({
        email:"",
        firstName:"",
        lastName:"",
        username:"",
        password:"",
        photo:"",
    })

    const{email, firstName, lastName, username, password, photo}=user;

    const onInputChange= (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/edituser/${id}`, user);
        navigate("/dashboard/" + id);
    };

    const loadImage = () => {
        console.log("okay running load image");
        let pic = user.image;
        var pic_display = document.getElementById('pic_display');
        console.log("pic: ", pic);
        if(pic.length > 0) {

            var blob = new Blob([pic], { type: "image/**"});
            let blobUrl = URL.createObjectURL(blob);
            pic_display.src = blobUrl;
            console.log(blobUrl);
        }
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/${id}`);
        console.log("result data: ", result.data);
        setUser(result.data);
        console.log(result.data);
        //user.image = result.data.image;
        //console.log("img path:", user.image);
        //loadImage();
    }

    return <div className="container" onLoad={loadUser}>
        <div className="row">
            <DashMenu/>
            <div className="col-md-8 center-block offset-md-2 border rounded p-3 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>
                <a className="link-unstyled" href={'/upload/' + id}>
                    <img src="./../assets/blank_profile_pic.png" alt="Avatar" className="w-50 border border-primary rounded-circle" id="pic_display"/> 
                </a>

                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">
                            E-mail
                        </label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder='Enter your email'
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
                    <button type="submit" className="btn btn-outline-success">Save</button>
                    <Link className="btn btn-outline-danger mx-2" to={'/dashboard/' + id}>Cancel</Link>
                </form>
            </div>
        </div>
    </div>;
}