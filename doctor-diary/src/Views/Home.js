import React, { Component } from "react";
import Button from '../Components/Button/Button.js'
import Header from '../Components/Header/Header.js';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            title: "DOCTOR DIARY",
            role: "CHOOSE ROLE",
            doctorButton: "DOCTOR",
            doctorButtonLink: "/doctor",
            healthOfficerButton: "HEALTH OFFICER",
            healthOfficerButtonLink: "/healthofficer"
        }
    }
    render () {
        return(
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                    <h2>{this.state.role}</h2>

                    <Button title={this.state.doctorButton} link={this.state.doctorButtonLink} />
                    <Button title={this.state.healthOfficerButton} link={this.state.healthOfficerButtonLink} />
            </main>
            </div>
        )
    }
}
