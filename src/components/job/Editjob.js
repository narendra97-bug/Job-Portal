import React,{useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import Editorbox from './Editorbox';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Editjob() {
    let location=useLocation();
    let history=useHistory();
    
    const [editjob, seteditjob] = useState(location.state)
    const onChange=(e)=>{
        seteditjob({...editjob,[e.target.name]:e.target.value})
    }

    const handleEdit=async(e)=>{
        e.preventDefault();

        let result = window.confirm("Are you sure you want to edit job?");
        if(result)
        {
            const response = await fetch(`http://localhost:5000/api/job/editjob/${editjob._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify(editjob)
            });
            const json = await response.json()

            if(json.success)
            {
                toast.success("Job has been updated successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
                history.push('/job/view',json.job);
            }
            else{
                toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }
        
    }

    const handleBack=()=>{
        history.push('/job/');
    }
return <div className="container" >
    <form>
    <div className="row mt-5 ">
        <div className="col-8 mx-5 mt-5 mb-5 ">
        <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body" style={{padding:"20px"}}>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Job Title*</h3>
                    </div>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border" required name="title" value={editjob.title} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Role*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control"  name="role" required value={editjob.role} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Type*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <select className="form-select form control form-select-lg mb-3" required name="type" onChange={onChange}>
                            {
                                editjob.type==="full-time" ?  <option value="full-time" selected>Full Time</option> : <option value="full-time">Full Time</option>
                            }
                            {
                                editjob.type==="part-time" ?  <option value="part-time" selected>Part Time</option> : <option value="part-time">Part Time</option>
                            }
                            {
                                editjob.type==="contract" ?  <option value="contract" selected>Contract</option> : <option value="contract">Contract</option>
                            }
                            {
                                editjob.type==="volunteer" ?  <option value="volunteer" selected>Volunteer</option> : <option value="volunteer">Volunteer</option>
                            }
                            {
                                editjob.type==="internship" ?  <option value="internship" selected>Internship</option> : <option value="internship">Internship</option>
                            }
                        </select>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >HR Name*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" required name="hrname" value={editjob.hrname} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Description*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <Editorbox name="description" setData={seteditjob} data={editjob}/>
                    </div>
                </div>
                <hr/>
                
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Minimum Required Skills </h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <textarea type="textarea" className="form-control" required name="skill" value={editjob.skill} onChange={onChange}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div className="col-3 mx-3 mt-5 mb-5 ">
            <div className='shadow-lg p-3 mb-5 bg-white rounded'>
            <div className="row mx-3">
                <div className="col">
                    <h3 className="mb-0 mt-5" >Experience From</h3>
                </div><p></p>
                <div className="col-sm-9 text-secondary">
                    <input type="number" className="form-control"  required name="expfrom" value={editjob.expfrom} onChange={onChange}/>
                </div>
            </div>
            <hr/>
            <div className="row mx-3 mb-5">
                <div className="col">
                    <h3 className="mt-3" >Experience To</h3>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input type="number" className="form-control" required name="expto" value={editjob.expto} onChange={onChange}/>
                </div>
            </div>
            </div>
        
        <button className='btn btn-secondary' style={{width:"80px"}} onClick={handleEdit}>Edit Job</button>
        <button className='btn btn-primary mx-4' style={{width:"80px"}} onClick={handleBack}>Back</button>

        </div>
    </div>
    </form>
</div>;
}

export default Editjob