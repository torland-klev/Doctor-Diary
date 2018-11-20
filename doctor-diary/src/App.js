import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Views/Home.js';
import HealthOfficerHome from './Views/HealthOfficerHome.js';
import HealthOfficerViewReport from './Views/HealthOfficerViewReport.js'
import HealthOfficerReportList from './Views/HealthOfficerReportList.js'
import DoctorHome from './Views/DoctorHome.js';

import Pending from './Views/Pending.js';
import Declined from './Views/Declined.js';
import NewEntry from './Views/NewEntry.js';
import ConfirmSendReport from './Views/ConfirmSendReport.js';

import NavBar from './Components/NavBar/NavBar.js';

class App extends Component {
  render() {
    return (
      //<Browse Router> brukes for å linke til andre sider til applikasjonen, må importeres over
      <BrowserRouter>
        <div>

          {/* Routing from main menu */}
          <Route exact={true} path='/' render={() => (<div className="App"> <Home /> </div>)} />
          <Route exact={true} path='/healthofficer' render={() => (<div className="App"> <HealthOfficerHome /></div>)} />
          <Route exact={true} path='/healthofficer/reportlist' render={(props) => (<div className="App"> <HealthOfficerReportList {...props}/></div>)} />
          <Route exact={true} path='/healthofficer/reportlist/report' render={(props) => (<div className="App"> <HealthOfficerViewReport {...props}/></div>)} />
          <Route exact={true} path='/doctor' render={() => (<div className="App"> <DoctorHome /> </div>)} />

          {/* Routing from the doctor side to the doctors reports */}
          <Route exact={true} path='/doctor/pending' render={() => (<div className="App"> <Pending />  </div>)} />
          <Route exact={true} path='/doctor/declined' render={() => (<div className="App"> <Declined /> </div>)} />
          <Route exact={true} path='/doctor/newEntry' render={() => (<div className="App"> <NewEntry /> </div>)} />
          <Route exact={true} path='/doctor/newEntry/confirmSendReport' render={() => (<div className="App"> <ConfirmSendReport /> </div>)} />

          <NavBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
