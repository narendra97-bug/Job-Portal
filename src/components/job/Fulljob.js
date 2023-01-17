import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function Fulljob(props) {
    const {job}=props
    const history=useHistory();

    const handleView=()=>{
        history.push("/job/view",job);
    }

    const handleEdit=()=>{
        history.push('/job/edit',job);
    }

    const handleApplication=()=>{
        history.push('/jobprovider/application',job._id);
    }
    
    useEffect(() => {
        //API Call
    }, [])
    
    return (
    <div className="row mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" style={{padding:"0px"}}>
        <div style={{padding:"25px"}}>
            <h2>{job.title}</h2>
            <p className='mt-3'><b>Type :</b> {job.type}</p>
            <p><b>Role :</b>  {job.role}</p>
            <p><b>HR :</b>  {job.hrname}</p>
            <p><b>Posted Date : </b><span>{job.postdate}</span></p>
            <div className='mt-4'>
                <button className='btn btn-primary' style={{width:"60px"}} onClick={handleView}>View</button>
                <button className='mx-4 btn btn-secondary' style={{width:"65px"}} onClick={handleEdit}>Edit</button>
                <button className='btn btn-success' style={{width:"150px"}} onClick={handleApplication}>View Application</button>
            </div>
        </div>
    </div>
    )
}

export default Fulljob


