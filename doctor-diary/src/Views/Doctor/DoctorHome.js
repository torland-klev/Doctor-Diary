import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import MainReportList from '../../Components/Report/MainReportList.js';
import {Link} from 'react-router-dom';

const TEI_ID = "vjVNrMa4zvc";

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            pendingButton: "Pending",
            pendingLink: "doctor/pending",
            declinedButton: "Declined",
            declinedLink: "doctor/declined",
            newButton: "New entry",
            newLink: "doctor/newEntry",
            homeLink: '/doctor',
            active: '#43CBCB'

        }
    }
    render () {
        return (
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
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
