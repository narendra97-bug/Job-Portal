import React,{useState,useEffect} from 'react'
import ShowAllJobs from './ShowAllJobs'
import '../home.css'
function ShowAllJob() {
    const [jobdata, setjobdata] = useState([])
    const getalljobs=async()=>{
        const response = await fetch("http://localhost:5000/api/jobseeker/getalljob/", {
            method: 'GET',
            headers: {
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()
        
        if(json.success)
        {
            setjobdata(json.jobarr);
        }
    }
    useEffect(() => {
        getalljobs();
    }, [])
    
    return (
        <div className='container mt-5'>
            <section className='' style={{fontSize:"30px",color:"black",marginTop:"20px",marginBottom:"20px",fontFamily:"Patua One,cursive"}}>
                <span className='p-5'>{jobdata.length===0 ?'No Jobs to display' : 'Find your Dream Job'}</span>
            </section>
            <br/>
            {jobdata.length===0 && 'No Jobs to display'}
            <div className="row">
                {jobdata.map((j) => {
                    return <ShowAllJobs key={j.job._id} j={j}/>
                })} 
            </div>
        </div>
    )
}
export default ShowAllJob