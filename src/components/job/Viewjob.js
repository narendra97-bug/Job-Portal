import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Viewjob() {
    const [arr, setarr] = useState([])
    let location = useLocation();
    let history = useHistory();
    const job = location.state;

    const handleBack = () => {
        history.goBack()
    }

    const handleEdit = () => {
        history.push('/job/edit', job);
    }

    useEffect(() => {
        setarr(job.description.split("\n"));
        console.log(arr)
    }, [])

    const handleDelete = async () => {
        let result = window.confirm("Are you sure you want to delete job?");
        if (result) {
            const response = await fetch(`http://localhost:5000/api/job/deletejob/${job._id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json()
            if (json.success) {
                toast.success("Job has been deleted successfully!", { position: toast.POSITION.BOTTOM_RIGHT })
                history.push('/job/');
            }
            else {
                toast.error("Some problem occured! Please Try Again!", { position: toast.POSITION.BOTTOM_RIGHT })
            }
        }
    }
    return (
        <div className='container' style={{color:"black"}}>
            <section className="mt-5">
                <div className="card card-outline card-info">
                <div className="card-header">
                <h2 style={{fontSize:"25px"}}>{job.title}</h2><br/>
                </div>
                <div className="card-body" style={{padding:"25px"}}>
                    <p className='mt-3'><b>Type :</b> {job.type}</p>
                    <p><b>Role :</b>  {job.role}</p>
                    <p><b>HR Name:</b>  {job.hrname}</p>
                    
                    <p><b>Skills : </b>{job.skill}</p>
                    <p><b>Experience  : </b>{job.expfrom} to {job.expto} years</p>
                    <p><b>Description : </b></p>
                    <div className='border' style={{padding:"20px"}} dangerouslySetInnerHTML={{ __html: job.description}} />
                    <br/>
                    <p><b>Posted Date : </b><span>{job.postdate}</span></p>
                </div>
                <div className="card-footer">
                    <button className='btn btn-secondary' style={{width:"65px"}} onClick={handleEdit}>Edit</button>
                    <button className='mx-4 btn btn-danger' style={{width:"75px"}} onClick={handleDelete}>Delete</button>
                    <button className='btn btn-primary' style={{width:"60px"}} onClick={handleBack}>Back</button>
                </div>
                </div>
            </section>
        </div>
          )
}

export default Viewjob