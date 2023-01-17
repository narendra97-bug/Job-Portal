import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import '../Login.css';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function UpdateProfile(props) {
    const [updateprofile, setupdateprofile] = useState(props.profile[0])

    const onChange=(e)=>{
        setupdateprofile({...updateprofile,[e.target.name] : e.target.value});        
    }

    const updateProfile = async (e)=>{
        e.preventDefault();
        console.log(updateprofile);
        const respose=await fetch("http://localhost:5000/api/jobseeker/updatedetails/"+ updateprofile._id,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token'),
              },
              body: JSON.stringify(updateprofile)
        });
        const json=await respose.json();
        if(json.success){
            props.changemode("show")
            toast.success("Profile has been Updated Successfully.", {position: toast.POSITION.BOTTOM_RIGHT})
        }
        else{
            toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }

    return( 
    <>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="col-9 mt-5">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <h2 style={{color:"#0062cc",textAlign:"center"}}>
                        Update your Profile
                    </h2>
                </div>
                <div className="card mb-3">
                    <div className="card-body" style={{padding:"20px"}}>
                        <form onSubmit={updateProfile}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >First Name *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="firstName" required className="form-control border" value={updateprofile.firstName} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Last Name *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="lastName" required className="form-control border" value={updateprofile.lastName} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Describe Yourself *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <textarea name="bio" required className="form-control border" value={updateprofile.bio} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Phone *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="contact" required className="form-control border" value={updateprofile.contact} minLength="10" maxLength="10" onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Collage *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="collage" required className="form-control border" value={updateprofile.collage} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Degree *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="degree" required className="form-control border" value={updateprofile.degree} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Skills *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="skills" required className="form-control border" value={updateprofile.skills} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Resume *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setupdateprofile({ ...updateprofile, resume: base64 })} />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Experience *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="number" min="0" max="35" name="experience" required className="form-control" value={updateprofile.experience} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Languages *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="language" required className="form-control" value={updateprofile.language} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >English Level *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="englishlevel" required className="form-control" value={updateprofile.englishlevel} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >City *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="city" required className="form-control" value={updateprofile.city} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >State *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="state" required className="form-control" value={updateprofile.state} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Profile Image *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <FileBase type="file" multiple={false} value={updateprofile.profileimage} onDone={({ base64 }) => setupdateprofile({ ...updateprofile, profileimage: base64 })} />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <button className="btn btn-info mx-3">Update Profile</button>
                                </div>
                            </div>
                        </form>
                        {/* {loading && <Loading/>}
                        {
                            msg.show && <div className="shadow-sm p-3 mb-5 bg-white rounded">
                                <h2  style={{color:"red",textAlign:"center"}}>
                                    {msg.text}
                                </h2>
                            </div>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default UpdateProfile;