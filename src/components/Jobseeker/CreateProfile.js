import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import '../Login.css';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function CreateProfile(props) {
    const [details, setdetails] = useState({email:"", firstName:"", lastName:"", bio:"", contact:"", collage:"", degree:"", skills:"", experience:"", language: "", englishlevel:"", city:"", state:"", resume:"", profileimage:""});
    //const [error, seterror] = useState([]);
   
    const onChange=(e)=>{
        e.preventDefault();
        setdetails({...details,[e.target.name]:e.target.value});
    }

    const createProfile = async (e)=>{
        e.preventDefault();
        //console.log({firstName:details.firstName, lastName:details.lastName, bio:details.bio, contact:details.contact, collage:details.collage, degree:details.degree, skills:details.skills, experience:details.experience, language: details.language, englishlevel:details.englishlevel, city:details.city, state:details.state, profileimage:details.profileimage})
        const response = await fetch("http://localhost:5000/api/jobseeker", {
            method: 'POST',
            headers: {
                'auth-token':localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify(details)
            });
        const json = await response.json()
        if(json.success){
            props.changemode("show")
            toast.success("Profile has been created successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
        else{
            toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }

    useEffect(async() => {
        const response = await fetch("http://localhost:5000/api/jobseeker/getemail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()

        if(json.success)
        {
            setdetails({...details, ["email"]: json.email})
        }
        
    }, [])

    return( 
    <>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div className="col-9 mt-5">
                <div className="shadow-sm p-3 mb-5 bg-white rounded">
                    <h2 style={{color:"#0062cc",textAlign:"center"}}>
                        Please Complete Your Profile!!
                    </h2>
                </div>
                <div className="card mb-3">
                    <div className="card-body" style={{padding:"20px"}}>
                        <form onSubmit={createProfile}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >First Name *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="firstName" required className="form-control border" value={details.firstName} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Last Name *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="lastName" required className="form-control border" value={details.lastName} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Describe Yourself *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <textarea name="bio" required className="form-control border" value={details.bio} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Phone *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="contact" required className="form-control border" value={details.contact} length="10" onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Collage *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="collage" required className="form-control border" value={details.collage} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Degree *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="degree" required className="form-control border" value={details.degree} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Skills *</h3>
                                </div>
                                <div className="col-sm-9">
                                    <input type="text" name="skills" required className="form-control border" value={details.skills} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Resume *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                <FileBase type="file" multiple={false} onDone={({ base64 }) => setdetails({ ...details, resume: base64 })} />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Experience *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="number" min="0" max="35" name="experience" required className="form-control" value={details.experience} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Languages *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="language" required className="form-control" value={details.language} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >English Level *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="englishlevel" required className="form-control" value={details.englishlevel} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >City *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="city" required className="form-control" value={details.city} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >State *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <input type="text" name="state" required className="form-control" value={details.state} onChange={onChange}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-3">
                                    <h3 className="mb-0 mx-4 mt-3" >Profile Image *</h3>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setdetails({ ...details, profileimage: base64 })} />
                                </div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm-12">
                                    <button className="btn btn-info mx-3">Save Profile</button>
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

export default CreateProfile;