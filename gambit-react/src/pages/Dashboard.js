import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { json, Link, useParams } from "react-router-dom";
import DashMenu from "../layout/DashMenu";

export default function Dashboard() {

    var index = 0;

    const [userList, setUserList]=useState([]);
    const [user, setUser] = useState({
        id:"",
        email:"",
        firstName:"",
        lastName:"",
        username:"",
    });
    //const{email, firstName, lastName, username, password, photo, display} = user;
    const {id} = useParams();

    var a = 0;
    const loadData = async () => {
        const result = await axios.get("http://localhost:8080/dashboard/" + id);
        //user.push(result.data);
        //setUser(result.data[a]);
        
        //user.map(u => console.log("user: --", u[0]));
        //console.log("list: ", userList);
        //console.log("name", result.data[a].firstName,"data", result.data[a]);
        //console.log("user:", user);

       // console.log("a",a);
        if(a == 0) {
            setUser(result.data[a]);
        }
        userList.push(result.data[a++]);
        //setUserList([...userList, result.data[a++]]);
        
        //console.log("display:", user.display);
    };

    const dislike = () => {
        //setUser(userList[index]);
        var card = document.getElementById("card");
        console.log("disliked... user display =", user.display);
        //card.style.display = "none";
       console.log(userList);
       setUser(userList.pop());
    }

    const like = async () => {
        //setUser(userList[index]);
        var card = document.getElementById("card");
        console.log("liked... ", {id:user.id});
        //card.style.display = "none";
        const result = await axios.post("http://localhost:8080/dashboard/" + id + "/like", JSON.stringify(user.id));
       setUser(userList.pop());
        
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
                                    <b>LOL Name:</b><h3 id="lastName"></h3>
                                    {user.lastName}
                                </li>
                            </ul>
                            <button type="submit" className="btn btn-outline-success" onClick={like}>Like</button>
                    <Link className="btn btn-outline-danger mx-2" onClick={dislike}>Dislike</Link>
                        </div>
                    </div>
            </div>
        </div>
    )
}