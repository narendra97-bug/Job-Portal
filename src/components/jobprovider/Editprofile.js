import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import React,{useState,useEffect} from 'react';
import FileBase from 'react-file-base64';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Editprofile(props) {

    const [edit, setedit] = useState({});

    const onChange=(e)=>{
        setedit({...edit,[e.target.name]:e.target.value})
    }

    const handleBack=()=>{
        props.convertmode("show");
    }

    const handleEdit=async(e)=>{
        e.preventDefault();
        
        // console.log("edit : ",edit)
        const response = await fetch("http://localhost:5000/api/jobprovider/editprofile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify(edit)
        });
        const json = await response.json()
        if(json.success)
        {
            toast.success("Profile has been updated successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
            handleBack();
        }
        else{
            toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }

    useEffect(() => {
        setedit(props.data);
    }, []);
    
    return <div>
        <div className="card mb-3">
            <div className="card-body" style={{padding:"20px"}}>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Company Name</h3>
                    </div>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border" name="cname" value={edit.cname} onChange={onChange}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Email</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input type="email" className="form-control" disabled name="email" value={edit.email} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Phone</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="contact" value={edit.contact} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Address</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="address" value={edit.address} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >City</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="city" value={edit.city} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >State</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="state" value={edit.state} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Company Type</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="type" value={edit.type} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Description</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="textarea" className="form-control" name="description" value={edit.description} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Website</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="website" value={edit.website} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Instagram</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="instagram" value={edit.instagram} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Facebook</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" name="facebook" value={edit.facebook} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Logo</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setedit({ ...edit, logo: base64 })} />
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-12">
                        <button className="btn btn-info mx-3" onClick={handleEdit}>Edit Profile</button>
                        <button className="btn btn-info " onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Editprofile;
