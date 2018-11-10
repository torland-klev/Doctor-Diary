import React, { Component } from 'react';
import Header from '../Components/Header.js';


export default class DoctorHome extends Component {
    state = {

    }
    render () {
        return (
            <div className="Home">
                <Header />
                <main className="Home-main">
                <h1>Doctor Diary</h1>
                    <a href='doctor/pending' className="Home-button">Pending</a>
                    <a href='doctor/declined' className="Home-button">Declined</a>
                    <a href='doctor/newEntry' className="Home-button">New entry</a>
                    <a href='/' className="Home-button">Go back</a>
                </main>
            </div>
          )
    }
}
