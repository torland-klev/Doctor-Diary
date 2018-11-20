import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import ReportListHolder from '../Components/Report/ReportListHolder.jsx';
import testEvent from '../Views/testEvent.js';

export default class HealthOfficerHome extends Component {
    constructor() {
        super();
        this.state = {
            title: "HEALTH OFFICER",
            backbutton: "Homepage",
            backbuttonlink: "/",
        }
    }
    render() {
        return (
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">
                    <ReportListHolder reports={testEvent}/>
                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
                </main>
            </div>
        )
    }

}
