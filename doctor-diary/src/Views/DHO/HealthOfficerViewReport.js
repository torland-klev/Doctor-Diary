import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import ReportHolder from '../../Components/Report/ReportHolder.jsx';
import {Link} from 'react-router-dom';

export default class HealthOfficerViewReport extends Component {
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
      console.log(user);
      if (user === "DOCTOR"){
        this.setState({backbuttonlink: '/doctor', title: 'DOCTOR VIEW REPORTS'});
      } else {
        this.setState({backbuttonlink: '/dho/reportlist', title: 'HEALTH OFFICER VIEW REPORTS'});
      }
    }

    render() {
      const {report} = this.props.location.state;
      return (this.props.location.state.user === "DOCTOR") ? (
          <div className="Home">
              <Header title={this.state.title} />
              <main className="Home-main">
                  <ReportHolder report={report}/>
                  <Link to={{pathname: this.state.backbuttonlink, state: {id: this.props.location.state.id}}}>
                    <div className="ReportPageButton">{this.state.backbutton}</div>
                  </Link>
              </main>
          </div>
      ) :
        (<div className="Home">
          <Header title={this.state.title} />
          <main className="Home-main">
              <ReportHolder report={report}/>
              <Link to={{pathname: this.state.backbuttonlink, state: {id: this.props.location.state.id}}}>
                <div className="ReportPageButton">{this.state.backbutton}</div>
              </Link>
              <Link to={{pathname: '/dho/reportlist/report/comment', state: {report: report}}}>
                <div>Comment</div>
              </Link>
          </main>
        </div>)
    }
}
