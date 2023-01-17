import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Editorbox from "./Editorbox";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Createjob() {

    let history=useHistory()
    
    const [jobdata, setjobdata] = useState({type:"full-time",title:"",hrname:"",skill:"",role:"",description:"",expfrom:0,expto:0});
    const [date, setdate] = useState("")
    const onChange=(e)=>{
        setjobdata({...jobdata,[e.target.name]:e.target.value})
    }
    useEffect(() => {
        let today=new Date();
        setdate(today.getDate(2)+'-'+(today.getMonth(2)+1)+'-'+today.getFullYear());
    }, [])
    

    const handleSubmit=async (e)=>{
        e.preventDefault();
        let result = window.confirm("Are you sure to post job?");
        if(result)
        {
            const response = await fetch("http://localhost:5000/api/job/createjob", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify(jobdata)
            });
            const json = await response.json()
            // console.log(json);
            if(json.success)
            {
                toast.success("Job has been posted successfully!", {position: toast.POSITION.BOTTOM_RIGHT})
                history.push('/job/')
            }
            else{
                toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }
    }

return <div className="container" >
    <form onSubmit={handleSubmit}>
    <div className="row mt-5 ">
        <div className="col-8 mx-5 mt-5 mb-5 ">
        <div className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body" style={{padding:"20px"}}>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Job Title*</h3>
                    </div>
                    <div className="col-sm-9">
                        <input type="text" className="form-control border" required name="title" value={jobdata.title} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Role*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <input type="text" className="form-control"  name="role" required value={jobdata.role} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Type*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <select className="form-select form control form-select-lg mb-3" required name="type" onChange={onChange}>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="volunteer">Volunteer</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >HR Name*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" className="form-control" required name="hrname" value={jobdata.hrname} onChange={onChange}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Description*</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <Editorbox name="description" setData={setjobdata} data={jobdata}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Job Post Date</h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <input type="text" disabled className="form-control" name="startdate" value={date}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-sm-3">
                        <h3 className="mb-0 mx-4 mt-3" >Minimum Required Skills </h3>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        <textarea type="textarea" className="form-control" required name="skill" value={jobdata.skill} onChange={onChange}/>
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
                    <input type="number" className="form-control"  required name="expfrom" value={jobdata.expfrom} onChange={onChange}/>
                </div>
            </div>
            <hr/>
            <div className="row mx-3 mb-5">
                <div className="col">
                    <h3 className="mt-3" >Experience To</h3>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input type="number" className="form-control" required name="expto" value={jobdata.expto} onChange={onChange}/>
                </div>
            </div>
            </div>

        <button className='btn btn-primary' style={{width:"100px"}}>Post Job</button>
        </div>
    </div>
    </form>
</div>;
}

export default Createjob

