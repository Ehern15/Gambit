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
        //user.push(result.data);
        setUser(result.data);
        //user.map(u => console.log("user: --", u[0]));
        console.log("data:", result.data);

        for(let i = 0; i < user.length; i++) {
            if(i == 0)
                user.display = "\"display:block;\"";
        }
        onLoad();
        //console.log("display:", user.display);
    };

    const onLoad = () => {
        var card = document.getElementById("card");
        var p = document.getElementById("id");
        p.style = user.display;
        p.innerHTML = id;

        var firstNameHeading = document.getElementById("firstName");
        firstNameHeading.innerHTML = user.firstName;
        console.log(card);
        console.log(p);
        console.log(display);
    }

    useEffect(()=>{
        loadData();
    }, []);

    return(<div className='contaner' onLoad={onLoad}>
            <div className="row">
                <DashMenu />

                <div className="card" id="card">
                        <div className="card-header">
                            Details of user id: <p id="id"></p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>First Name:</b><h3 id="firstName"></h3>
                                    {user.firstName}
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    )
}