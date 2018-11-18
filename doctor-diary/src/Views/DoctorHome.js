import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import Button from '../Components/Button/Button.js'
import NewButton from '../Components/Button/NewButton.js';
import NavBar from '../Components/NavBar/NavBar.js';


export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            backbutton: "Homepage",
            backbuttonlink: "/",
            pendingButton: "Pending",
            pendingButtonLink: "doctor/pending",
            declinedButton: "Declined",
            declinedButtonLink: "doctor/declined",
            newButton: "New entry",
            newButtonLink: "doctor/newEntry"
        }
    }
    render () {
        return (
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
                    <Button title={this.state.pendingButton} link={this.state.pendingButtonLink} />
                    <Button title={this.state.declinedButton} link={this.state.declinedButtonLink} />
                    <NewButton title={this.state.newButton} link={this.state.newButtonLink} />
                    
                </main>
                <nav>
                    <NavBar />
                </nav>
            </div>
          )
    }
}
