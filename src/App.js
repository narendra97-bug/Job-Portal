import './App.css';
import React, { useState,useEffect } from 'react';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Verified from './components/Verified';
import { Route,Switch,Redirect} from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import ViewFullJob from './components/Jobseeker/ShowJobs/ViewFullJob';
import ViewProviderProfile from './components/Jobseeker/ViewProviderProfile';
import Viewprofile from './components/Application/Viewprofile';
import Jobprovider from './components/Jobprovider';
import Jobseeker from './components/Jobseeker';
import PageNotFound from './components/PageNotFound';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SearchedJob from './components/Jobseeker/Search/SearchedJob';

function App() {

    const [alert, setAlert] = useState(null);
    const [role, setrole] = useState("")

    const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    const displayAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
    }

  const getRole=async()=>{
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: 'POST',
      headers: {
          'auth-token' : localStorage.getItem('token')
      }
    });
    const json = await response.json()

    if(json.success)
    {
      setrole(json.role);
    }
  }

  useEffect(async() => {
    getRole();
  }, [])
  
  return (
    <div>
      <Navbar setrole={setrole} role={role}/>
      <br/>
      <br/>
      <Alert alert={alert}/>

      <Switch>
        <Route exact path="/jobseeker/jobs/search"><SearchedJob/></Route>
        <Route exact path="/jobseeker/job/view"><ViewFullJob/></Route>           
        <Route exact path="/jobprovider/profile/view/:id"><ViewProviderProfile/></Route>
        <Route exact path="/jobseeker/profile/view/:id"><Viewprofile/></Route>
        <Route exact path="/about"><About/></Route>
        {
          (role==="provider") && <Jobprovider/>
        }
        {
          (role==="seeker") && <Jobseeker/>
        }
        {
          (role==="") && <Switch>
            {/* <Route exact path="/"><Redirect to='/login'/></Route> */}
            <Route exact path="/"><Home/></Route>
            <Route exact path="/login" ><Login showAlert={showAlert} setrole={setrole}/></Route>
            <Route exact path="/register" ><Register showAlert={showAlert}/></Route>
            <Route exact path="/verified/:message" ><Verified/></Route>
            <Route exact path="/forgotpassword" ><ForgotPassword displayAlert={displayAlert} showAlert={showAlert}/></Route>
            <Route exact path="/resetpassword/:userId/:resetString" ><ResetPassword showAlert={showAlert}/></Route>
            <Route path="*"><PageNotFound/></Route>
          </Switch>
        }
      </Switch>
    </div>
    
  );
}

export default App;
