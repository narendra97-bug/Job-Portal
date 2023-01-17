import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function Navbar(props) {
    const [temp, settemp] = useState(0);
    let history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        temp === 1 ? settemp(0) : settemp(1);
        // console.log(temp);
        props.setrole("")
        history.push("/");
    }

    let location = useLocation();

    return <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">GetJob.com</Link>
                <div id="main-nav" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        
                        <li><Link to={(props.role == "provider") ? "/jobprovider": "/"} className={`nav-item nav-link ${(location.pathname === "/" || location.pathname === "/jobprovider") ? "active" : ""}`}>Home</Link></li>
                        {/* <li><Link to="/about" className={`nav-item nav-link ${location.pathname === "/about" ? "active" : ""}`}>About Us</Link></li> */}

                        {
                            (props.role == "provider") && <li className="dropdown">
                                <Link to="/job" className="nav-item nav-link" data-toggle="dropdown">Jobs</Link>
                                <div className="dropdown-menu">
                                    <Link to="/job/create" className="dropdown-item">Post the Job</Link>
                                    <Link to="/job/" className="dropdown-item">Posted Jobs</Link>
                                </div>
                            </li>
                        }
                        {
                            (props.role == "seeker") && <li><Link to="/jobseeker/applicationstatus" className={`nav-item nav-link ${location.pathname === "/jobseeker/applicationstatus" ? "active" : ""}`}>Job Status</Link></li>
                        }

                        {!localStorage.getItem("token")
                            ? <><li><Link to="/login" className={`nav-item nav-link ${location.pathname === "/login" ? "active" : ""}`} >Login</Link></li>
                                <li><Link to="/register" className={`nav-item nav-link ${location.pathname === "/register" ? "active" : ""}`}>Register</Link></li></>
                            : <li className="dropdown">
                                <Link to={(props.role == "provider") ? "/jobprovider": "/"} className="nav-item nav-link" data-toggle="dropdown"><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;{localStorage.getItem("username")} </Link>
                                <div className="dropdown-menu">
                                    {
                                        (props.role === "provider") && <Link to="/jobprovider/profile" className="dropdown-item">Profile</Link>
                                    }
                                    {
                                        (props.role === "seeker") && <Link to="/jobseeker/profile" className="dropdown-item">Profile</Link>
                                    }

                                    <Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </div>;
}

export default Navbar;
