import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js'

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
                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
                </main>
            </div>
        )
    }

}
