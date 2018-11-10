import React, { Component } from 'react';
import Home from './Views/Home.js'
import DoctorHome from './Views/DoctorHome.js'
import New from './Views/New.js';
import Pending from './Views/Pending.js';
import Declined from './Views/Declined.js';
import HealthOfficerHome from './Views/HealthOfficerHome.js'
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      //<Browse Router> brukes for å linke til andre sider til applikasjonen, må importeres over
      <BrowserRouter>
        <div>

          {/* Routing from main menu */}
          <Route exact={true} path='/' render={() => (<div className="App"> <Home /> </div>)} />
          <Route exact={true} path='/healthofficer' render={() => (<div className="App"> <HealthOfficerHome /></div>)} />
          <Route exact={true} path='/doctor' render={() => (<div className="App"> <DoctorHome /> </div>)} />

          {/* Routing from the doctor side to the doctors reports */}
          <Route exact={true} path='/doctor/pending' render={() => (<div className="App"> <Pending /> </div>)} />
          <Route exact={true} path='/doctor/new' render={() => (<div className="App"> <New /></div>)} />
          <Route exact={true} path='/doctor/declined' render={() => (<div className="App"> <Declined /> </div>)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
