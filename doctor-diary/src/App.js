import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import Home from './Views/Home.js';

/* Componens used */
import Header from './Components/Header/Header.js';
import NavBar from './Components/NavBar/NavBar.js';

/* Pages for Health Officer */
import HealthOfficerHome from './Views/HealthOfficerHome.js';
import HealthOfficerViewReport from './Views/HealthOfficerViewReport.js'
import ApproveReject from './Views/ApproveReject.js'

/* Pages for Doctor */
import DoctorHome from './Views/DoctorHome.js';
import Pending from './Views/Pending.js';
import Declined from './Views/Declined.js';
import NewEntry from './Views/NewEntry.js';
import ConfirmSendReport from './Views/ConfirmSendReport.js';

function checkRole(){
  const meAPI = "https://course.dhis2.org/dhis/api/me";
  //var user = "BjarneB" // dho
  var user = "AkselJ" //doctor
  var pass = "District1-" //hardkodet for nå
  var authKey = 'Basic ' + btoa(user + ':' + pass);
  var role = "";
  return fetch(meAPI, {
    method: 'GET',
    headers: {
    'Accept': 'application/json',
    'Authorization': authKey,
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
      return null;
    })
  }) ;
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkRoleResult: "",
    }
  }

  componentDidMount() {
    checkRole().then(response => {
      this.setState({checkRoleResult: response});
    })
  }
  render() {
    if(this.state.checkRoleResult === "doctor"){
      return(
        <Router>
          <div>
            <Header />
            <Route exact={true} path='/doctor' render={() => (<div className="App"> <DoctorHome /> </div>)} />
            <Route exact={true} path='/approveReject' render={() => (<div className="App"> <ApproveReject /> </div>)} />
            <Route exact={true} path='/doctor/pending' render={() => (<div className="App"> <Pending />  </div>)} />
            <Route exact={true} path='/doctor/declined' render={() => (<div className="App"> <Declined /> </div>)} />
            <Route exact={true} path='/doctor/newEntry' render={() => (<div className="App"> <NewEntry /> </div>)} />
            <Route exact={true} path='/doctor/newEntry/confirmSendReport' render={() => (<div className="App"> <ConfirmSendReport /> </div>)} />
            <Route exact path='/' component={ () => <Redirect to='/doctor' component={DoctorHome} /> } />
            <NavBar />
          </div>
        </Router>
      );
    } else if (this.state.checkRoleResult === "dho"){
      return(
        <Router>
          <div>
            <Route exact={true} path='/dho' render={() => (<div className="App"> <HealthOfficerHome /></div>)} />
            <Route exact={true} path='/dho/report' render={(props) => (<div className="App"> <HealthOfficerViewReport {...props}/></div>)} />
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
