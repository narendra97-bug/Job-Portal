import React, { useState, useEffect }from 'react';
import CreateProfile from './CreateProfile'
import ShowProfile from './ShowProfile'
import UpdateProfile from './UpdateProfile'
//import { useHistory } from 'react-router-dom';

function Profile() {
    const [mode, setmode] = useState("show");
    const [profile, setprofile] = useState([]);

    const changemode=(value)=>{
        setmode(value);
    }

    const showProfile = async ()=>{
        const respose=await fetch("http://localhost:5000/api/jobseeker/fetchdetails",{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        });
        const json=await respose.json()
        if(json.length == 0){
            setmode('create')
        }
        setprofile(json)
    }

    useEffect(() => {
        showProfile();
    },[]);

    const handleUpdate = async (profile)=>{
        setmode("update");
    }

    return( 
    <div>
        {mode==="update" ? <UpdateProfile profile={profile} changemode={changemode}/>: ""}
        {mode==="create" ? <CreateProfile changemode={changemode}/>: ""}
        {mode==="show" ? <ShowProfile profile={profile} setprofile={setprofile} showProfile={showProfile} handleUpdate={handleUpdate}/> : ""}
    </div>
    )
}

export default Profile;