import React, { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import verify from './verify.jpg'
import CompleteProfile from "./CompleteProfile";
import Loading from "../Loading";
import ShowJob from "./../job/Showjob";
import video from './../Jobseeker/video.mp4'
import Profile from './../Jobseeker/profile.png'
import searchJob from './../Jobseeker/searchJob.png'
import hireEmployee from './../jobprovider/hireemployee.png'
import InterviewBro from './../Jobseeker/Interview-bro.svg'



function JobproviderHome() {
	const [mode, setmode] = useState("");

	const changeMode=(mode)=>{
		setmode(mode);
	}

	const checkUser = async() => {
		const response = await fetch("http://localhost:5000/api/jobprovider/check", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});

		const json = await response.json();
		if (json.success) {
			setmode("complete");
		}
		else{
			setmode("incomplete")
		}
	};

	useEffect(async() => {
		await checkUser();
	}, []);
	
	return (
		<div>
			<div>
				{
					(mode==="") && <Loading/>
				}
				{
					(mode==="incomplete") && <CompleteProfile changeMode={changeMode}/> 
				}
				{
					(mode==="complete") && <>
					<div>
						<div class="main-banner" id="top">
							<video autoPlay muted loop id="bg-video">
								<source src={video} type="video/mp4" />
							</video>
							<div class="video-overlay header-text">
								<div class="caption">
									<h6>choose more,choose right</h6>
									<h2>Hire the Best <em>Employee</em> </h2>
									<div>
										<Link to="/job/create/" className="btn btn-info px-5"> Post Job</Link>
									</div>
									<br/>
								</div>
							</div>
						</div>
					</div>
					<div>
						<ShowJob/>
					</div>
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
								<h1>Complete your company profile</h1>
								<p>Add all details about your company</p>
								</div>
							</div>

							<div className="row mt-5">
								<div className="col-4 ">
									<img src={searchJob} width="90" height="70"></img>
								</div>
								<div className="col-8 ">
									<h1>Post the job</h1>
									<p>Add all necessary details about job </p>
								</div>
								</div>
								<div className="row mt-5">
								<div className="col-4 ">
									<img src={hireEmployee} width="90" height="70"></img>
								</div>
								<div className="col-8 ">
									<h1>Hire Eligible Candidate</h1>
									<p>Do hiring process step by step</p>
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
				</>
				}
			</div>
		</div>
	);
}

export default JobproviderHome;
