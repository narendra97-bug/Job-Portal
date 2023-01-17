import React from 'react';
import ShowJob from './Jobseeker/ShowJobs/ShowJob';
import ShowAllJob from './Jobseeker/ShowJobs/ShowAllJob';
import video from './Jobseeker/video.mp4'
import './Jobseeker/home.css'
import './Login.css'
import Search from './Jobseeker/Search/Search'
import Profile from './Jobseeker/profile.png'
import searchJob from './Jobseeker/searchJob.png'
import applyJob from './Jobseeker/applyJob.png'
import InterviewBro from './Jobseeker/Interview-bro.svg'

function Home() {
  return <>
      <div>
          <div className="main-banner" id="top">
            <video autoPlay muted loop id="bg-video">
                <source src={video} type="video/mp4" />
            </video>
            <div className="video-overlay header-text">
              <div className="caption">
                <h6>Start your career now</h6>
                <h2>Find the perfect <em>Job</em></h2>
                <Search/>
              </div>
            </div>
          </div>
         {!localStorage.getItem("token")?<></>:<ShowJob/>}
        <ShowAllJob/>
        </div><br/><br/>
      <section classname="mt-2" style={{backgroundColor:"#EEEEEE"}}>
        <div className="container">
          <div className="row">
            <div className="col-5" style={{fontSize:"40px",color:"black",marginTop:"40px",marginBottom:"80px",fontFamily:"Alegreya Sans, sans-serif"}}>
              <div className="text-center mb-5" style={{fontFamily:"Patua One,cursive"}}>
                <span >How it Works?</span><br/>
              </div>

              <div className="row" >
                <div className="col-4 ">
                  <img src={Profile} width="90" height="80"></img>
                </div>
                <div className="col-8 ">
                  <h1>Complete your Profile</h1>
                  <p>Upload your Resume</p>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-4 ">
                    <img src={searchJob} width="90" height="70"></img>
                  </div>
                  <div className="col-8 ">
                    <h1>Search for the job</h1>
                    <p>search job as your filter</p>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-4 ">
                    <img src={applyJob} width="90" height="70"></img>
                  </div>
                  <div className="col-8 ">
                    <h1>Apply for the job</h1>
                    <p>get touch with HR through E-mail and check application status</p>
                  </div>
                </div>
            </div>
            <div className="col-2"></div>
            <div className="col-5" style={{fontSize:"40px",color:"black",marginTop:"40px",marginBottom:"80px",fontFamily:"cursive"}}>
              <div className="text-center mb-5">
                <img src={InterviewBro}/>
              </div>
            </div>
          </div>
        </div>  
      </section><br/><br/>
  </>;
}

export default Home;
