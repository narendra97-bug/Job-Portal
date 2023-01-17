import React,{useState,useEffect} from 'react'
import {useParams } from "react-router-dom";
import Loading from './../Loading'

function Viewprofile() {
    let {id}=useParams();
    
    const [data, setdata] = useState(null)

    const getProfile=async()=>{
        const response = await fetch(`http://localhost:5000/api/jobseeker/profile/${id}`,{
            method: 'POST',
            headers: {
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()

        if(json.success)
        {
            setInterval(() => {
                setdata(json.data)
            }, 1000);
        }
        else
        {
            console.log(json.error)
        }
    }
    useEffect(() => {
        getProfile();
    }, [])
    
    var skillarr, skill;
    return (
        <>
        {
            (!data) ?  <Loading/> : <div className="container emp-profile shadow-lg p-3 mb-5 bg-light rounded p-5">
            <form method="post">
               <div className="row">
                   <div className="col-md-4">
                       <div className="profile-img">
                           <img src={data.profileimage} alt="no image"/>
                       </div>
                   </div>
                   <div className="col-md-6">
                       <div className="profile-head">
                           <h2>
                               {data.firstName + " " + data.lastName} 
                           </h2>
                           <h3>
                               {data.bio}
                           </h3>
                           <br/>
                           <ul className="nav nav-tabs" id="myTab" role="tablist">
                               <li className="nav-item">
                                   <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"><b>About</b></a>
                               </li>
                               <li className="nav-item mx-5">
                                   <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"><b>Qualifications</b></a>
                               </li>
                           </ul>
                       </div>
                   </div>
               </div>
               <div className="row">
                   <div className="col-md-4">
                       <div className="profile-work">
                            <h3>SKILLS</h3>
                            <div style={{display:"none"}}>
                            {skill = data.skills.toLowerCase()}
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
                                   <div className="col-md-4">
                                       <label>Name</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.firstName + " " + data.lastName} </p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Email</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.email}</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Phone</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{"(+91) " + data.contact}</p>
                                   </div>
                               </div>
                                <div className="row">
                                   <div className="col-md-4">
                                       <label>City</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.city}</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>State</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.state}</p>
                                   </div>
                               </div>
                           </div>
                           <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Collage</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.collage}</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Degree</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.degree}</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Job Experience</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.experience} years</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Languages</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.language}</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>English Level</label>
                                   </div>
                                   <div className="col-md-6">
                                       <p>{data.englishlevel}</p>
                                   </div>
                               </div>
                               <div className="row">
                                   <div className="col-md-4">
                                       <label>Resume</label>
                                   </div>
                                   <div className="resume col-md-6">
                                       <p>
                                           <a href={data.resume} target="_blank" rel="noreferrer noopener">
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
            }
</>)
}

export default Viewprofile