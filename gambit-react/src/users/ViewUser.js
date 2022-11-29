import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams  } from "react-router-dom";

export default function ViewUser() {

    const [user, setUser]=useState({
        email:"",
        firstName:"",
        lastName:"",
        username:"",
        password:"",
    });

    const { id } = useParams();

    useEffect(() => {
      loadUser();
    }, []);
  
    const loadUser = async () => {
      const result = await axios.get(`http://localhost:8080/viewuser/${id}`);
      setUser(result.data);
      console.log(result.data);
    };

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6-offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">View User</h2>
                
                    <div className="card">
                        <div className="card-header">
                            Details of user id: {user.id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>E-mail:</b>
                                    {user.email}
                                </li>
                                <li className="list-group-item">
                                    <b>First Name:</b>
                                    {user.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>Last Name:</b>
                                    {user.lastName}
                                </li>
                                <li className="list-group-item">
                                    <b>Username:</b>
                                    {user.username}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={`/matchlist/` + id}>Back</Link>
                </div>
            </div>
        </div>
    );
}