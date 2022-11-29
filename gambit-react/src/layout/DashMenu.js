import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import './../dashnav.css';

export default function DashMenu() {

    const [users, setUsers] = useState([]);
    const { id } = useParams();

    const sendEditUser = (link) => {
        window.location.href = link;
    };

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">


            <div id="navbarSupportedContent">
                <ul className="nav navbar-center">
                    <li><a className="link-unstyled" href={'/edituser/' + id} ><i className="fa-regular fa-user fa-2x m-3 shadow-none"></i></a></li>
                    <li><a className="link-unstyled" href={'/dashboard/' + id}><i className="fa-solid fa-dice fa-2x"></i></a></li>
                    <li><a className="link-unstyled" href={'/matchlist/' + id}><i className="fa-regular fa-envelope fa-2x m-3"></i></a></li>
                    <li><a className="link-unstyled" href={'/'}><i class="fa-solid fa-door-open fa-2x m-3"></i></a></li>
                </ul>
            </div>
            </nav>
        </div>
    )
}