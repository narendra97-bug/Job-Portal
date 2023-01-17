import React,{useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import SearchedJobs from './SearchedJobs';

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function SearchedJob() {
    let location=useLocation();
    let history=useHistory();

    const queryParams=new URLSearchParams(location.search);
    const [query, setquery] = useState(queryParams.get('query'));
    
    const onChange = (e)=>{
        e.preventDefault();
        setquery(e.target.value);
    }
    const jobs=location.state.jobs;
  
    const search = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/jobseeker/search/"+query, {
        method: 'GET',
        headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
        });
        const json = await response.json()
       
        if(json.success){
            history.push({
                pathname: "/jobseeker/jobs/search",
                search: 'query='+query,
                state:{jobs:json.jobarr,input:query}
            })
        }
        else{
            toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }

    return (
        <>
        <section className='mt-5'>
            <div className="container-fluid">
                <h2 className="text-center display-4">Search job here </h2><br/>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <form onSubmit={search}>
                            <div className="input-group border">
                                <input type="search" style={{background:"white"}} value={query} onChange={onChange} name="query" className="form-control form-control-lg" placeholder="Search job here"/>
                                <div className="input-group-append">
                                    <button className="border">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    </div>                
            </div>
        </section>
            <div className='container mt-5'>
                <h1>Searched Jobs</h1>
                <br/>
                {jobs.length===0 && 'No Jobs to display'}
                <div className="row">
                    {jobs.map((j) => {
                        return <SearchedJobs key={j.job._id} j={j}/>
                    })} 
                </div>
            </div>
        </>
    )
}
export default SearchedJob