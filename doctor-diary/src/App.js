import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './Views/Home.js';


/* Pages for Health Officer */
import HealthOfficerHome from './Views/DHO/HealthOfficerHome.js';
import ViewReport from './Views/DHO/ViewReport.js'
import HealthOfficerReportList from './Views/DHO/HealthOfficerReportList.js'
import ApproveReject from './Views/ApproveReject.js'

/* Pages for Doctor */
import DoctorHome from './Views/Doctor/DoctorHome.js';
import NewEntry from './Views/Doctor/NewEntry.js';
import ConfirmSendReport from './Views/Doctor/ConfirmSendReport.js';
import EditEntry from './Views/Doctor/EditEntry.js';
import Api from './Api.js';


function checkRole(){
  const meAPI = "https://course.dhis2.org/dhis/api/me";
  /** For å endre hvilken side dere ser på (dho/doctor) fjern // */
  //var user = "BjarneB" // dho
  var user = "AkselJ" //doctor
  var pass = "District1-" //hardkodet for nå
  var authentKey = 'Basic ' + btoa(user + ':' + pass);
  var role = "";
  return fetch(meAPI, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Authorization': authentKey,
  }
  }).then(function(response){
    return response.json().then(data => {
      var doctorRoleID = "kNIhGGdyWFp";
      //var doctorRoleID = "noe"; //for testing at man kommer til hjemsiden hvis ingen gyldig rolle
      var dhoRoleID = "RYOicE8XVw9";
      var roles = [];

      data.userCredentials.userRoles.forEach(element => {
          roles.push(element.id);
      })

      if(roles.includes(doctorRoleID)){
        role="doctor";
        return Promise.resolve(role);


      }else if(roles.includes(dhoRoleID)){
        role="dho"
        return Promise.resolve(role);

      }
    }).catch(function (error){
      return "error";
    })
  }) ;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkRoleResult: " ",
    }
  }

  componentDidMount() {
    Api.checkRole().then(response => {
      this.setState({checkRoleResult: response});
    })
  }

  render() {
    if(this.state.checkRoleResult === "doctor"){
      return(
        <Router>
          <div>
            <Route exact={true} path='/doctor' render={() => (<div className="App"> <DoctorHome /> </div>)} />
            <Route exact={true} path='/doctor/newEntry' render={() => (<div className="App"> <NewEntry /> </div>)} />
            <Route exact={true} path='/doctor/report' render={(props) => (<div className="App"> <ViewReport {...props}/></div>)} />
            <Route exact={true} path='/doctor/newEntry/confirmSendReport' render={() => (<div className="App"> <ConfirmSendReport /> </div>)} />
            <Route exact={true} path='/doctor/editEntry' render={(props) => (<div className="App"> <EditEntry {...props}/> </div>)} />
            <Route exact path='/' component={ () => <Redirect to='/doctor' component={DoctorHome} /> } />
          </div>
        </Router>
      );
    } else if (this.state.checkRoleResult === "dho"){
      return(
        <Router>
          <div>
            <Route exact={true} path='/dho' render={() => (<div className="App"> <HealthOfficerHome /></div>)} />
			      <Route exact={true} path='/dho/reportlist' render={(props) => (<div className="App"> <HealthOfficerReportList {...props}/></div>)} />
            <Route exact={true} path='/dho/reportlist/report' render={(props) => (<div className="App"> <ViewReport {...props}/></div>)} />
            <Route exact={true} path='/dho/reportlist/report/comment' render={(props) => (<div className="App"> <ApproveReject {...props}/></div>)} />
            <Route exact path='/' component={ () => <Redirect to='/dho' component={HealthOfficerHome} /> } />
          </div>
        </Router>
      );
    } else {
      return(
        <Router>
          <div>
            <Route exact={true} path='/' render={() => (<div className="App"> <Home /> </div>)} />
          </div>
        </Router>
      )
    }
  }
}

export default App;
