import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { json, Link, useParams } from "react-router-dom";
import DashMenu from "../layout/DashMenu";

export default function Dashboard() {

    var index = 0;
    const [user, setUser]=useState([{
        email:"",
        firstName:"",
        lastName:"",
        username:"",
        display:"\"display:none;\""
    }]);
    const{email, firstName, lastName, username, password, photo, display} = user;
    const {id} = useParams();

    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/dashboard/" + id);
        user.push(result.data);
        setUser(result.data);
        //user.map(u => console.log("user: --", u[0]));
        console.log("data:", result.data);

        for(let i = 0; i < user.length; i++) {
            if(i == 0)
                user.display = "";
        }

        //console.log("display:", user.display);
    };

    useEffect(()=>{
        loadData();
    }, []);

    return(
        <div className='contaner'>
            <div className="row">
                <DashMenu/>
                <div className="py-4">
                <div className="card">
                        <div className="card-header" >
                            
                            Details of user id: <p>{id}</p>
                            
                            
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item">
                                    <b>First Name:</b>{user.firstName}
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}