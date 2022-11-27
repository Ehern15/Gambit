import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { json, Link, useParams } from "react-router-dom";
import DashMenu from "../layout/DashMenu";
import Dashboard from './Dashboard';

export default function MatchList() {

    const [users, setUsers]=useState([{
        email:"",
        firstName:"",
        lastName:"",
        username:"",
        password:"",
    }]);
    //const{email, firstName, lastName, username, password, photo, display} = user;
    const {id} = useParams();

    const loadData = async () => {
        const result = await axios.get(`http://localhost:8080/matchlist/${id}`);
        setUsers(result.data);
        console.log(result.data);
    };

    const unmatchUser = async (userId) => {
        await axios.post(`http://localhost:8080/unmatch/${id}`, JSON.stringify(userId));
        loadData();
    };

    useEffect(()=>{
        loadData();
    }, []);

    return(        <div className="container">
        <DashMenu/>
    <div className="py-4">
      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  className="btn btn-success mx-2"
                  to={`/viewuser/${user.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  
                >
                  Chat
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => unmatchUser(user.id)}
                >
                  Unmatch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
    )
}