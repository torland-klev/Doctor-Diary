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
import ConfirmEditedReport from './Views/Doctor/ConfirmEditedReport.js';
import EditEntry from './Views/Doctor/EditEntry.js';
import Api from './Api.js';

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
            <Route exact={true} path='/doctor/editEntry/confirmEditedReport' render={() => (<div className="App"> <ConfirmEditedReport /> </div>)} />
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
