import React, { useState } from 'react';
import './Profile.css'
import Showprofile from './Showprofile';
import Editprofile from './Editprofile';
function Profile() {

    const [mode, setmode] = useState("show");
    const [data, setdata] = useState({logo:"",cname:"",type:"",website:"",instagram:"",facebook:"",city:"",state:""});

    const setData=(data)=>{
        setdata(data)
    }
    const convertmode=(mode)=>{
        setmode(mode);
    }
  return <div className="container">
  <div className="main-body">
      <br/><br/><br/>

      <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
              <div className="card">
                  <div className="card-body">
                      <div className="d-flex flex-column align-items-center text-center">
                          <img src={data.logo} alt="Admin" className="rounded-circle" width="250" height="250"/>
                          <div className="mt-3">
                              <h2>{data.cname}</h2>
                              <p className="text-secondary mb-1">{data.type}</p>
                              <p className="text-muted font-size-sm">{data.city},{data.state},India</p>
                          </div>
                      </div>
                  </div>
                </div>
                  <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h3 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="feather feather-globe mr-2 icon-inline">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <path
                                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                        </path>
                                    </svg>&nbsp;&nbsp;&nbsp;Website</h3>
                                <span className="text-secondary">{data.website}</span>
                            </li>
                            
                            
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h3 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="feather feather-instagram mr-2 icon-inline text-danger">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                    </svg>&nbsp;&nbsp;&nbsp;Instagram</h3>
                                <span className="text-secondary">{data.instagram}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                <h3 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round"
                                        className="feather feather-facebook mr-2 icon-inline text-primary">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z">
                                        </path>
                                    </svg>&nbsp;&nbsp;&nbsp;Facebook</h3>
                                <span className="text-secondary">{data.facebook}</span>
                            </li>
                        </ul>
                    </div>
            </div>
            <div className="col-md-8">
                {
                    (mode==="show") ? <Showprofile convertmode={convertmode} data={data} setData={setData}/> :
                    <Editprofile convertmode={convertmode} data={data}/>
                }
            </div>
        </div>
    </div>
</div>;
}

export default Profile;
