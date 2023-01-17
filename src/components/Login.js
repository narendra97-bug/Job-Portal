import React from 'react';
import './Login.css';
import './Jobseeker/home.css'
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Login(props) {

    let history = useHistory();
    const [credentials, setcredentials] = useState({ email: "", pass: "" });
    const [error, seterror] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const LoginNow = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.pass })
        });
        const json = await response.json()

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('username', json.name);
            if (json.role === "provider")
                history.push('/jobprovider')
            else
                history.push('/jobseeker/profile');
            // props.showAlert("Login Successfully", "success");
            toast.success("Logged-In Successfully.", {position: toast.POSITION.BOTTOM_RIGHT})
            props.setrole(json.role)
            // props.setUser(json.user)
        }
        else {
            seterror(json.error);
            if (json.warning)
                // props.showAlert(json.warning, "danger");
                toast.error(json.warning, {position: toast.POSITION.BOTTOM_RIGHT})

        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="col-6" style={{ marginTop: '60px' }}>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <h2 style={{ color: "#0062cc", textAlign: "center" }}>
                            Login
                        </h2>
                    </div>
                    <div className="card shadow-lg p-3 bg-white rounded">
                        <div className="card-body" style={{ padding: "20px" }}>
                            <form onSubmit={LoginNow}>
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
                                        <h3 className="mb-0 mx-4 mt-3" >Password</h3>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="password" className="form-control" name="pass" required value={credentials.password} onChange={onChange} />
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group d-flex">
                                    {error.length !== 0 && <ul>{error.map((e) => {
                                        return <li key={e.msg}>{e.msg}</li>
                                    })}</ul>
                                    }
                                </div>

                                <button className='btn btn-primary' style={{ width: "100px", height: "35px" }}>Login Now</button>
                                {/* <Link className='float-right' to="/register">New Here?</Link> */}
                                    <Link className='float-right' to="/forgotpassword">Forgot your password?</Link>
                            </form>     
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;