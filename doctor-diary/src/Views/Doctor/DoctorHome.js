import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import IconHome from '../../Components/NavBar/IconHome.js';
import IconAdd from '../../Components/NavBar/IconAdd.js';

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            backbutton: "Go to homepage",
            backLink: "/",
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
                        <a href={this.state.pendingLink}>
                            <button>{this.state.pendingButton}</button>
                        </a>
                        <a href={this.state.declinedLink}>
                            <button>{this.state.declinedButton}</button>
                        </a>
                        <a href={this.state.newLink}>
                            <button>{this.state.newButton}</button>
                        </a>
                </main>
                <NavBar homeFill={this.state.active}/>
            </div>
          )
    }
}