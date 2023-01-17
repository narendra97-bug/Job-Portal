import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

toast.configure()

function Application() {
    let location=useLocation();

    const [applicationData, setapplicationData] = useState([])
    const [round0, setround0] = useState([])
    const [round1, setround1] = useState([])
    const [round2, setround2] = useState([])
    const [hired, sethired] = useState([])
    const [rejected, setrejected] = useState([])

    const [mode, setmode] = useState("round0")
    
    const changeMode=(e)=>{
        setmode(e.target.value);

        if(e.target.value==="round0")
            setapplicationData(round0)
        else if(e.target.value==="round1")
            setapplicationData(round1)
        else if(e.target.value==="round2")
            setapplicationData(round2)
        else if(e.target.value==="hired")
            setapplicationData(hired)
        else if(e.target.value==="rejected")
            setapplicationData(rejected)
        else
            setapplicationData([]);
    }
    const getData=async ()=>{
    
        const response = await fetch(`http://localhost:5000/api/jobprovider/getapplication/${location.state}`,{
            method: 'POST',
            headers: {
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()

        if(json.success)
        {
            setround0(json.data[0])
            setround1(json.data[1])
            setround2(json.data[2])
            sethired(json.data[3])
            setrejected(json.data[4])
            setapplicationData(json.data[0])
        }
        else
        {
            toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }
    useEffect(() => {
        getData();
    }, [])
    
    const handleHire=async (e,id)=>{
        e.preventDefault();

        let result = window.confirm("Are you sure to hire candidate?");
        if(result)
        {
            const response = await fetch("http://localhost:5000/api/application/change", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify({jobId: location.state, jobseekerId: id,hired:1})
            });
    
            const json = await response.json()
          
            if (json.success){
                getData();
            }
            else{
                toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }
    }

    const handleNext=async (e,id)=>{
        e.preventDefault();

        let result = window.confirm("Are you sure to send candidate into next round?");
        if(result)
        {
            const response = await fetch("http://localhost:5000/api/application/change/sendnext", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify({jobId: location.state, jobseekerId: id})
            });
    
            const json = await response.json()
          
            if (json.success){
                getData();
            }
            else{
                toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }
    }

    const handleReject=async (e,id)=>{
        e.preventDefault();

        let result = window.confirm("Are you sure to reject candidate?");
        if(result)
        {
            const response = await fetch("http://localhost:5000/api/application/change/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : localStorage.getItem('token')
                },
                body: JSON.stringify({jobId: location.state, jobseekerId: id,rejected:1})
            });
    
            const json = await response.json()
          
            if (json.success){
                getData();
            }
            else{
                toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
            }
        }


    }
    let count=1;
    return (
    <div className='container'>
        <br/>
        <h1 style={{display:"inline-block",borderBottom:"3px solid black"}}>Job Application</h1>
        <br/>
        <br/>

        <div className="row text-center mt-5 d-flex justify-content-around" style={{color:"black"}}>

            <div className="col-2  shadow-sm p-3 mb-5 bg-white rounded" style={{borderTop:"3px solid black"}}>
                <p style={{fontSize:"60px"}}>{round0.length+round1.length+round2.length+rejected.length+hired.length}</p>
                <p className='mt-3'style={{fontSize:"18px",fontWeight:"bold"}}>Total Applied</p>
            </div>

            <div className="col-2  shadow-sm p-3 mb-5 bg-white rounded" style={{borderTop:"3px solid black"}}>
                <p style={{fontSize:"60px"}}>{rejected.length}</p>
                <p className='mt-3'style={{fontSize:"18px",fontWeight:"bold"}}>Total Rejected</p>
            </div>

            <div className="col-2  shadow-sm p-3 mb-5 bg-white rounded" style={{borderTop:"3px solid black"}}>
                <p style={{fontSize:"60px"}}>{round0.length+round1.length+round2.length}</p>
                <p className='mt-3'style={{fontSize:"18px",fontWeight:"bold"}}>In Progress</p>
            </div>

            <div className="col-2  shadow-sm p-3 mb-5 bg-white rounded" style={{borderTop:"3px solid black"}}>
                <p style={{fontSize:"60px"}}>{hired.length}</p>
                <p className='mt-3'style={{fontSize:"18px",fontWeight:"bold"}}>Total Hired</p>
            </div>
            
        </div>
        <div className="row text-center mt-5" style={{color:"black"}}>
            <div className="col-4">
                <select className="form-select" aria-label="Default select example" name="mode" onChange={changeMode} style={{fontSize:"15px"}}>
                    <option value="round0">Round 0</option>
                    <option value="round1">Round 1</option>
                    <option value="round2">Round 2</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                </select>
            </div>
            
        </div>
        <br/>
        {mode==="round2" && <h1>Technical Round Cleared Candidate</h1>  }
        {mode==="round0" && <h1>job applied Candidate</h1> }
        {mode==="round1" && <h1>Aptitude Cleared Candidate</h1> }
        {mode==="hired" && <h1>Hired Candidate</h1> }
        {mode==="rejected" && <h1>Rejected Candidate</h1> }

        <br/>
        <table id="emp" className="table table-hover shadow p-3 mb-5 bg-white rounded">
            <thead>
                <tr>
                    <th scope="col" style={{paddingLeft:"40px",paddingRight:"40px"}}>#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Profile</th>
                    <th scope="col">Hire</th>
                    <th scope="col">Send to next round</th>
                    <th scope="col">Reject</th>
                </tr>
            </thead>
            <tbody>
                {
                    applicationData.map((obj)=>{
                        return <tr key={count} className='border'>
                            <th scope="row" style={{paddingLeft:"40px",paddingRight:"40px"}}>{count++}</th>
                            <td>{obj.email}</td>
                            <td>{obj.firstName+" "+obj.lastName}</td>
                            {
                                (mode==="rejected" ?  <td>Rejected</td> : (mode=="hired" ? <td>Hired</td> : <td>{mode} </td>))
                            }
                            <td><a target="_blank" href={`http://localhost:3000/jobseeker/profile/view/${obj._id}`}>click here</a></td>
                           
                           {
                               (mode==="hired" || mode==="rejected") ? <></> :<>
                                <td><button className='btn btn-outline-info' style={{width:"80px"}} onClick={(e)=>{handleHire(e,obj._id)}}>Hire</button></td>
                                {   
                                    (mode!=="round2") && <td><button className='btn btn-outline-success' style={{width:"180px"}} onClick={(e)=>{handleNext(e,obj._id)}}>Send to Next Round</button></td> 
                                }
                               </>
                           }
                           {
                               (mode!=="rejected") && <td><button className='btn btn-outline-secondary' style={{width:"80px"}} onClick={(e)=>{handleReject(e,obj._id)}}>Reject</button></td>
                           }
                        </tr>
                    })
                }
            </tbody>
        </table>
        <ReactHTMLTableToExcel  
            className="btn btn-success mb-5 p-3 px-5"  
            table="emp"  
            filename="ReportExcel"  
            sheet="Sheet"  
            buttonText="Export to excel"
            padding="80px"/> 
    </div>
    )
}

export default Application