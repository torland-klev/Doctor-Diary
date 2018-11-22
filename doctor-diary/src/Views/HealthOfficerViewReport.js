import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import ReportHolder from '../Components/Report/ReportHolder.jsx';
import {Link} from 'react-router-dom';

export default class HealthOfficerViewReport extends Component {
    constructor() {
        super();
        this.state = {
            title: "HEALTH OFFICER VIEW REPORTS",
            backbutton: "Back",
            backbuttonlink: "/dho/reportlist",
        }
    }
    render() {
      const {report} = this.props.location.state;
        return (
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">
                    <ReportHolder report={report}/>
                    <Link to={{pathname: '/dho/reportlist', state: {id: this.props.location.state.id}}}>
                      <div className="BackButton">BACK</div>
                    </Link>
                </main>
            </div>
        )
    }
}
