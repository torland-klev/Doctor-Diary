import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import ReportHolder from '../../Components/Report/ReportHolder.jsx';
import {Link} from 'react-router-dom';

/**
This view displays one report in read-only view.
**/

export default class ViewReport extends Component {
  constructor() {
    super();
      this.state = {
        title: "",
        backbutton: "Back",
        backbuttonlink: "",
      }
  }


  componentDidMount(){
    const user = this.props.location.state.user;
    if (user === "DOCTOR"){
      this.setState({backbuttonlink: '/doctor', title: 'DOCTOR VIEW REPORTS'});
    }
    else {
      this.setState({backbuttonlink: '/dho/reportlist', title: 'HEALTH OFFICER VIEW REPORTS'});
    }
  }


  render() {
    const {report} = this.props.location.state;
    return (this.props.location.state.user === "DOCTOR") ? (
      <div>
        <Header title={this.state.title} />
        <main>
          <ReportHolder report={report}/>
            <div className="ReportView">
              <Link to={{pathname: this.state.backbuttonlink, state: {id: this.props.location.state.id}}}>
                <div className="ReportPageButton">{this.state.backbutton}</div>
                  </Link>
                  <Link to={{pathname: '/doctor/editEntry', state: {report: report, id: this.props.location.state.id}}}>
                    <div className="ReportPageButton">Edit</div>
                  </Link>
                  </div>
              </main>
          </div>
      ) :
        (<div>
          <Header title={this.state.title} />
          <main>
              <h2> Viewing report </h2>
              <ReportHolder report={report}/>
              <div className="ReportView">
                <Link to={{pathname: this.state.backbuttonlink, state: {id: this.props.location.state.id}}}>
                  <div className="ReportPageButton">{this.state.backbutton}</div>
                </Link>
                <Link to={{pathname: '/dho/reportlist/report/comment', state: {report: report, id: this.props.location.state.id}}}>
                  <div className="ReportPageButton">Comment</div>
                </Link>
              </div>
          </main>
        </div>)
    }
}
