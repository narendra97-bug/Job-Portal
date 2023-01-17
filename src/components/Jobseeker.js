import React from 'react'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import JobseekerProfile from './Jobseeker/Profile';
import Home from './Home';
import PageNotFound from './PageNotFound';
import ViewFullJob from './Jobseeker/ShowJobs/ViewFullJob';
import ApplicationStatus from './Jobseeker/ApplicationStatus';
import SearchedJob from './Jobseeker/Search/SearchedJob';
import SearchedFullJob from './Jobseeker/Search/SearchedFullJob';

function Jobseeker() {
  return (
    <div>
        <Switch>
            <Route exact path="/"><Home/></Route>
            <Route exact path="/jobseeker/profile" ><JobseekerProfile/></Route>
            <Route exact path="/jobseeker/job/view"><ViewFullJob/></Route>
            <Route path="/jobseeker/job/search"><SearchedFullJob/></Route>
            <Route exact path="/jobseeker/jobs/search"><SearchedJob/></Route>
            <Route exact path="/jobseeker/applicationstatus"><ApplicationStatus/></Route>
            <Route path="*"><PageNotFound/></Route>
        </Switch>
    </div>
  )
}

export default Jobseeker

{/*  */}
        //   