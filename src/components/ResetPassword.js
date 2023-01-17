import React from 'react';
import './Login.css';
import './Jobseeker/home.css'
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function ResetPassword(props) {
    const history = useHistory();
    const [credentials, setcredentials] = useState({ pass: "", rpass: "" });
    const [error, seterror] = useState([]);
    let { userId, resetString } = useParams();

    const onChange = (e) => {
        e.preventDefault();
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const resetPassword = async (e) => {
        e.preventDefault();
        if (credentials.pass !== credentials.rpass)
            toast.warning("Both passwords should be same.", { position: toast.POSITION.BOTTOM_RIGHT })
        else {
            const response = await fetch("http://localhost:5000/api/auth/resetPassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, resetString, newPassword: credentials.pass })
            });
            const json = await response.json()
            if (json.success) {
                toast.success(json.message, { position: toast.POSITION.BOTTOM_RIGHT })
                history.push("/login")
            }
            else {
                toast.error(json.message, { position: toast.POSITION.BOTTOM_RIGHT })
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="col-6" style={{ marginTop: '60px' }}>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <h2 style={{ color: "#0062cc", textAlign: "center" }}>
                            Reset your Password
                        </h2>
                    </div>
                    <div className="card shadow-lg p-3 bg-white rounded">
                        <div className="card-body" style={{ padding: "20px" }}>
                            <form onSubmit={resetPassword}>
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
                                        <h3 className="mb-0 mx-4 mt-3" >Retype-Password</h3>
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

                                <button className='btn btn-primary' style={{ width: "130px", height: "35px" }}>Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResetPassword;