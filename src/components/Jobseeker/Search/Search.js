import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

function Search() {
    const [input, setInput] = useState('');

    const history=useHistory();
    const search = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/jobseeker/search/"+input, {
        method: 'GET',
        headers: {
            'auth-token':localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
        });
        const json = await response.json()
        console.log(json.jobarr)
        if(json.success){
            history.push({
                pathname: "/jobseeker/jobs/search",
                search: 'query='+input,
                state:{jobs:json.jobarr,input:input}
            })
        }
        else{
            toast.error("Some problem occured! Please Try Again!", {position: toast.POSITION.BOTTOM_RIGHT})
        }
    }
    return(
        <>
        <div className="search-box" style={{marginLeft: '35px'}}>
            <button onClick={search} className="btn-search" ><FontAwesomeIcon icon={faSearch} /></button>
            <input type="text" className="input-search" placeholder="Type to Search..." value={input} onInput={e => setInput(e.target.value)} onKeyDown={(event) => {if(event.key === 'Enter'){search(event)}}}/>
        </div>
        </>
    )
}

export default Search;