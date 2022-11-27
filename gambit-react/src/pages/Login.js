import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";

export default function Login() {

    document.body.style.backgroundImage = "url(/gambit-react/src/Images/wallpaper.png)";
    let navigate = useNavigate();

    const [user, setUser]=useState({
        email:"",
        password:"",

    })

    const{email, password}=user;

    const onInputChange= (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    };

    const onSubmit = async (e) => {
       e.preventDefault();
       await axios.post("http://localhost:8080/login", user)
       .then(response => {
            console.log("resp data: ", response.data);

            if(response.data.login_error == '0') {
                console.log("Login success!");

                axios.get(`http://localhost:8080/fetchid/${user.email}`)
                .then(response => {
                    console.log(response.data);

                    /*navigate.push({
                        pathname: '/dashboard',
                        id: response.data // your data array of objects
                    })*/
                    navigate(`/dashboard/${response.data}`);
                })
            
            }
            else {
                document.getElementById("error_msg").className = "";
            }
       });


        //navigate("/login");
    };

    const login = (e, email, password) => {
        console.log('Logging in... email:', email, 'pass', password);
    };

    return(
        <div className="container">
            <div className="row">
                <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3 my-2">
                        <label htmlFor="Email" className="form-label">E-mail</label>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder="E-mail"
                            name="email"
                            onChange={(e) => onInputChange(e)}/>
                    </div>

                    <div className="mb-3 my-2">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input
                            type={"password"}
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => onInputChange(e)}/>
                    </div>

                    <button className="btn btn-success mx-2" onClick={(e) => login(e, user.email, user.password)}>Login</button>
                    <Link className="btn btn-primary mx-2" to="/register/">Register</Link>
                    <br/><h4 id="error_msg" className="d-none">Invalid Email or Password.</h4>
                </form>
            </div>
        </div>
    )
}