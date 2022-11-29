import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <div>
           <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet"/>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <a className="navbar-brand" href="#">Gambit</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                </li>
                <Link className="btn btn-outline-light" to="/register">
                    Sign Up
                </Link>
                <Link className="btn btn-outline-light" to="/report-issue">
                    Report Issue
                </Link>
                </ul>
            </div>
            </nav>
        </div>
    )
}