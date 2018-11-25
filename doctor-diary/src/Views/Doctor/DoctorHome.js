import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import MainReportList from '../../Components/Report/MainReportList.js';
import {Link} from 'react-router-dom';

/**
This is the main view of the doctor side of the app.
It shows a MainReportList.
The site is similar to HealthOfficerReportList.
**/

const TEI_ID = "vjVNrMa4zvc";

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            newButton: "New entry",
            newLink: "doctor/newEntry",
            active: '#43CBCB'

        }
    }

    render () {
        return (
            <div>
                <Header title={this.state.title}/>
                <main>
                    <MainReportList id={TEI_ID} user="DOCTOR" />
                    <Link to={{pathname: this.state.newLink}}>
                      <div className="ReportPageButton">{this.state.newButton}</div>
                    </Link>
                </main>
                <NavBar homeFill={this.state.active}/>
            </div>
          )
    }
}
