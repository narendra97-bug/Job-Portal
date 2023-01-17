import React, { useState, useEffect } from 'react';
import "./showprofile.css";

function ShowProfile(props) { 
    useEffect(() => {
       props.showProfile();
    }, []);
    
    var skillarr, skill;
    return( 
    <>
        {
            props.profile.map((f)=>{
            return(
            <div className="container emp-profile shadow-lg p-8 mb-5 bg-white rounded" key={f._id}>
                <form method="post">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={f.profileimage} alt=""/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h2>
                                    {f.firstName + " " + f.lastName} 
                                </h2>
                                <h3>
                                    {f.bio}
                                </h3>
                                <br/>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item mx-5">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Qualifications</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="button" className="profile-edit-btn" name="btnAddMore" onClick={props.handleUpdate} value="Edit Profile"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <h3>SKILLS</h3>
                                <div style={{display:"none"}}>
                                {skill = f.skills.toLowerCase()}
                                {skillarr = skill.split(',')}        
                                </div>
                                <a>{skillarr[0]}</a><br/>
                                <a>{skillarr[1]}</a><br/>
                                <a>{skillarr[2]}</a><br/>
                                <a>{skillarr[3]}</a><br/>
                                <a>{skillarr[4]}</a><br/> 
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.firstName + " " + f.lastName} </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{(f.email)}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{"(+91) " + f.contact}</p>
                                        </div>
                                    </div>
                                     <div className="row">
                                        <div className="col-md-6">
                                            <label>City</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.city}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>State</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.state}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Collage</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.collage}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Degree</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.degree}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Job Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.experience} years</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Languages</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.language}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{f.englishlevel}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Resume</label>
                                        </div>
                                        <div className="resume col-md-6">
                                            <p>
                                                <a href={f.resume} target="_blank" rel="noreferrer noopener">
                                                    Click Here
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>           
            </div>
            )})
        }
    </>
    )
}

export default ShowProfile;