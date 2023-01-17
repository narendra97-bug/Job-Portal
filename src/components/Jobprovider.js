import React from 'react'
import { BrowserRouter as Router, Route , Switch,Redirect} from 'react-router-dom';
import Showjob from './job/Showjob';
import Createjob from './job/Createjob';
import Viewjob from './job/Viewjob';
import Editjob from './job/Editjob';
import Application from './jobprovider/Application';
import Profile from './jobprovider/Profile';
import JobproviderHome from './jobprovider/JobproviderHome';
import PageNotFound from './PageNotFound';

function Jobprovider() {
  return (
    <div>
        <Switch>
            <Route exact path="/"><Redirect to='/jobprovider'/></Route>
            <Route exact path="/job/"><Showjob/></Route>
            <Route exact path="/job/create"><Createjob/></Route>
            <Route exact path="/job/view"><Viewjob/></Route>
            <Route exact path="/job/edit"><Editjob/></Route>
            <Route exact path="/jobprovider/application/"><Application/></Route>
            <Route exact path="/jobprovider/profile"><Profile/></Route>
            <Route exact path="/jobprovider"><JobproviderHome/></Route>
            <Route path="*"><PageNotFound/></Route>
        </Switch>
    </div>
  )
}

export default Jobprovider