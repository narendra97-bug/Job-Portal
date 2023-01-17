import React,{useState,useEffect} from 'react';
import Loading from '../Loading';
import FileBase from 'react-file-base64';

function CompleteProfile(props) {

    const obj={email:"",cname:"",contact:"",address:"",city:"",state:"",type:"",description:"",logo:"",website:"",instagram:"",facebook:""};
    const [profile, setprofile] = useState(obj);
    const [loading, setloading] = useState(false);
    const [msg, setmsg] = useState({show:false,text:""});

    const onChange = (e)=>{
        setprofile({...profile, [e.target.name]: e.target.value})
    }

    const handleSave=async (e)=>{
        e.preventDefault();
        setloading(true);

        const response = await fetch("http://localhost:5000/api/jobprovider/createprofile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify(profile)
        });
        const json = await response.json()

        setTimeout(() => {
            setloading(false);
            if(json.success)
            {
                props.changeMode("complete")
            }
            else{
                setmsg({show:true,text:json.error});
            }
        }, 2000);
    }

    useEffect(async() => {
        const response = await fetch("http://localhost:5000/api/jobprovider/getemail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()

        if(json.success)
        {
            setprofile({...profile, ["email"]: json.email})
        }
        
    }, [])
    
    return <div className="col-8">
        <div className="shadow-sm p-3 mb-5 bg-white rounded">
            <h2  style={{color:"blue",textAlign:"center"}}>
                Your Profile is Incomplete! Please Complete it.
            </h2>
        </div>
        <div className="card mb-3">
            <div className="card-body" style={{padding:"20px"}}>
                <form onSubmit={handleSave}>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Company Name *</h3>
                        </div>
                        <div className="col-sm-9">
                            <input type="text" name="cname" required className="form-control border" onChange={onChange}/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Email *</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                        <input type="email" name="email" className="form-control" disabled value={profile.email}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Phone *</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" maxLength={10} name="contact" required className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Address *</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="address" required className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >City *</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="city" required className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >State *</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="state" required className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Company Type *</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="type" required className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Description</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="description" className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Website</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="website" className="form-control"onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Instagram</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="instagram" className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Facebook</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <input type="text" name="facebook" className="form-control" onChange={onChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <h3 className="mb-0 mx-4 mt-3" >Logo</h3>
                        </div>
                        <div className="col-sm-9 text-secondary">
                            <FileBase type="file" multiple={false} onDone={({ base64 }) => setprofile({ ...profile, logo: base64 })} />
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-12">
                            <button className="btn btn-info mx-3" >Save Profile</button>
                        </div>
                    </div>
                </form>
                {loading && <Loading/>}
                {
                    msg.show && <div className="shadow-sm p-3 mb-5 bg-white rounded">
                        <h2  style={{color:"red",textAlign:"center"}}>
                            {msg.text}
                        </h2>
                    </div>
                }
            </div>
        </div>
    </div>;
}

export default CompleteProfile;