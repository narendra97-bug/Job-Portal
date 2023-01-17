import React from 'react';
import './Login.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Register() {
    const [credentials, setcredentials] = useState({ email: "", username: "", pass: "", rpass: "" });
    const [error, seterror] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const RegisterNow = async (str) => {

        if (credentials.pass !== credentials.rpass)
            toast.warning("Both passwords should be same.", {position: toast.POSITION.BOTTOM_RIGHT})
        else {
            const response = await fetch("http://localhost:5000/api/auth/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.username, email: credentials.email, password: credentials.pass, role: str })
            });
            const json = await response.json()

            console.log(json)
            if (json.success) {
                toast.success(json.message, {position: toast.POSITION.BOTTOM_RIGHT})
            }
            else {
                seterror(json.error);
                if (json.warning)
                    toast.error(json.warning, {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }

    }

    const RegisterAsSeeker = async (e) => {
        console.log("register as a seeker")
        e.preventDefault();
        RegisterNow("seeker");
    }

    const RegisterAsProvider = async (e) => {
        e.preventDefault();
        RegisterNow("provider");
    }

    return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="col-6" style={{ marginTop: '40px' }}>
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <h2 style={{ color: "#0062cc", textAlign: "center" }}>
                    Register Yourself
                </h2>
            </div>
            <div className="card shadow-lg p-3 bg-white rounded">
                <div className="card-body" style={{ padding: "20px" }}>
                    <form>
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Email</h3>
                            </div>
                            <div className="col-sm-9">
                                <input type="email" className="form-control border" required name="email" value={credentials.email} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Username</h3>
                            </div>
                            <div className="col-sm-9">
                                <input type="text" className="form-control border" required name="username" value={credentials.username} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Password</h3>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control" name="pass" required value={credentials.pass} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Retype Password</h3>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control" name="rpass" required value={credentials.rpass} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="form-group d-flex">
                            {error.length !== 0 && <ul>{error.map((e) => {
                                return <li key={e.msg}>{e.msg}</li>
                            })}</ul>
                            }
                        </div>
                        <div className="text-center">
                        <button className='btn btn-primary' style={{ width: "300px", height: "40px"}} onClick={RegisterAsSeeker}>Register as Jobseeker</button>
                        <div>OR</div>
                        <button className='btn btn-primary' style={{ width: "300px", height: "40px"}} onClick={RegisterAsProvider}>Register as Jobprovider</button>
                        <br/>
                        <br/>
                        <Link to="/login">Already registered?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Register;
