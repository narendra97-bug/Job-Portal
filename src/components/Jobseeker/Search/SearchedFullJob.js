import React from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function SearchedFulljob() {
    let location=useLocation();
    let history=useHistory();
    console.log(location.state)
    const j=location.state.j;

    const handleBack=()=>{
        history.goBack()
    }

    const handleApply=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/jobseeker/applyforjob/${j.job._id}`, {
            method: 'GET',
            headers: {
                'auth-token':localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            });
        const json = await response.json()
        console.log(json)
        if(json.success){
            //alert('You have successfully applied for this job!!');
            toast.success("You have successfully applied for this job!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
        else{
            toast.error(json.error, {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }
    
    var getdate = function(d) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var d = new Date(d);
        var date = d.getDate();
        var month = monthNames[d.getMonth()]
        var year = d.getFullYear();
        return date + " " + month + " " + year;
    }

return (
<div className='container mt-5' style={{color:"black"}}>
    <div className="row mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" >
        <div style={{padding:"25px"}}>
            <h2 style={{fontSize:"25px"}}>{j.job.title}</h2><br/>
            <p className='mt-3'><b>Type :</b> {j.job.type}</p>
            <p><b>Role :</b>  {j.job.role}</p>
            <p><b>HR Name:</b>  {j.job.hrname}</p>
            <p><b>Skills : </b>{j.job.skill}</p>
            <p><b>Experience  : </b>{j.job.expfrom} to {j.job.expto} years</p>
            <p><b>Check Company Details : </b><a target="_blank" href={`http://localhost:3000/jobprovider/profile/view/${j.jobprovider._id}`}>Click here</a></p>
            <p><b>Description : </b></p>
            <div className='border' style={{padding:"20px"}} dangerouslySetInnerHTML={{ __html: j.job.description}} />
            <br/>
            <p><b>Posted Date : </b><span>{getdate(j.job.postdate)}</span></p>
        </div>
        <div className='mt-2 mb-4 ml-4'>
            <button className='btn btn-primary' style={{width:"60px"}} onClick={handleBack}>Back</button>&nbsp;&nbsp;
            <button className='btn btn-secondary' style={{width:"60px"}} onClick={handleApply}>Apply</button>
        </div>
    </div>
</div>
  )
}

export default SearchedFulljob