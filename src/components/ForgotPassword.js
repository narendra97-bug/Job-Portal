import React from 'react';
import './Login.css';
import './Jobseeker/home.css'
import { useState } from 'react';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function ForgotPassword() {
    const [credentials, setcredentials] = useState({email: ""});
    const [error, seterror] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const forgotPassword = async (e) => {
        e.preventDefault();
        toast.info("Sending mail....", { position: toast.POSITION.BOTTOM_RIGHT })
        const response = await fetch("http://localhost:5000/api/auth/requestPasswordReset", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, redirectUrl:"http://localhost:3000/resetpassword"})
        });
        const json = await response.json()
        
        if(json.success){
            // props.displayAlert(json.message, "success");
            toast.success(json.message, {position: toast.POSITION.BOTTOM_RIGHT})
        }
        else{
            // props.showAlert(json.message,"danger");
            toast.error(json.message, {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }
    
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="col-6" style={{ marginTop: '60px' }}>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <h2 style={{ color: "#0062cc", textAlign: "center" }}>
                            Forgot your Password
                        </h2>
                    </div>
                    <div className="card shadow-lg p-3 bg-white rounded">
                        <div className="card-body" style={{ padding: "20px" }}>
                            <form onSubmit={forgotPassword}>
                                 <div className="row">
                                    <div className="col-sm-3">
                                        <h3 className="mb-0 mx-4 mt-3" >Email</h3>
                                    </div>
                                    <div className="col-sm-9">
                                        <input type="email" className="form-control border" required name="email" value={credentials.email} onChange={onChange} />
                                    </div>
                                </div>
                                <hr />
                               
                                <div className="form-group d-flex">
                                    {error.length !== 0 && <ul>{error.map((e) => {
                                        return <li key={e.msg}>{e.msg}</li>
                                    })}</ul>
                                    }
                                </div>

                                <button className='btn btn-primary' style={{ width: "100px", height: "35px" }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;