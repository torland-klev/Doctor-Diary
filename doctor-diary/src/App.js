import React, { Component } from 'react';
import Test from './Views/Test.js'
import Home from './Views/Home.js'
import DoctorHome from './Views/DoctorHome.js'
import HealthOfficerHome from './Views/HealthOfficerHome.js'
import NewEntry from './Views/NewEntry.js'
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      //<Browse Router> brukes for å linke til andre sider til applikasjonen, må importeres over
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (<div className="App"> <Home /> </div>)} />
          <Route exact={true} path='/healthofficer' render={() => (<div className="App"> <HealthOfficerHome /></div>)} />
          <Route exact={true} path='/doctor' render={() => (<div className="App"> <DoctorHome /> </div>)} />
          <Route exact={true} path='/newEntry' render={() => (<div className="App"> <NewEntry /> </div>)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
