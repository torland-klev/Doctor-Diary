import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import ReportHolder from '../Components/Report/ReportHolder.jsx';

export default class HealthOfficerViewReport extends Component {
    constructor() {
        super();
        this.state = {
            title: "HEALTH OFFICER VIEW REPORTS",
            backbutton: "Back",
            backbuttonlink: "/dho",
        }
    }
    render() {
      const {report} = this.props.location.state;
      console.log(report);
        return (
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">
                    <ReportHolder report={report}/>
                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
                </main>
            </div>
        )
    }
}
