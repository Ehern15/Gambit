import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { json, Link, useParams } from "react-router-dom";
import DashMenu from "../layout/DashMenu";

export default function Dashboard() {

    var index = 0;

    const [userList, setUserList]=useState([]);
    const [user, setUser] = useState({
        email:"",
        firstName:"",
        lastName:"",
        username:"",
        display:"\"display:none;\""
    });
    //const{email, firstName, lastName, username, password, photo, display} = user;
    const {id} = useParams();

    var a = 0;
    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/dashboard/" + id);
        //user.push(result.data);
       // setUser(result.data[a]);
        setUserList([...userList, result.data[a]]);
        //user.map(u => console.log("user: --", u[0]));
        console.log("list: ", userList);
        console.log("data", result.data[a++]);
        console.log("user:", user);


        if(a == 0) {
            userList[a].display = "\"display:block;\"";
            index++;
            setUser(userList[a+1]);
        }
            
        
        //console.log("display:", user.display);
    };

    const dislike = () => {
        user = userList[index];
        //var firstNameHeading = document.getElementById("firstName");
        //firstNameHeading.innerHTML = user.firstName;
        //console.log(card);
        //console.log(p);
        //console.log(display);
    }

    useEffect(()=>{
        loadData();
    }, []);

    return(<div className='contaner'>
            <div className="row">
                <DashMenu />

                <div className="card" id="card">
                        <div className="card-header">
                            Details of user id: <p id="id">{user.id}</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>First Name:</b><h3 id="firstName"></h3>
                                    {user.firstName}
                                </li>
                                <li className="list-group-item">
                                    <b>Last Name:</b><h3 id="lastName"></h3>
                                    {user.lastName}
                                </li>
                            </ul>
                            <button type="submit" className="btn btn-outline-success">Like</button>
                    <Link className="btn btn-outline-danger mx-2" onClick={dislike}>Dislike</Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}