import React, { Component } from 'react';
import Header from '../Components/Header.js';


export default class DoctorHome extends Component {
    state = {

    }
    render () {
        const title = "DOCTOR";
        return (
            <div className="Home">
                <Header title={title}/>
                <main className="Home-main">
                    <a href='doctor/pending' className="Home-button">Pending</a>
                    <a href='doctor/declined' className="Home-button">Declined</a>
                    <a href='/' className="Home-button">Go back</a>
                   
                </main>
                <footer>
                    <button  className="New-button">
                    <a href='doctor/newEntry' >New entry</a>
                    </button>
                </footer>
            </div>
          )
    }
}
