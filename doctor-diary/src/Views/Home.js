import React, { Component } from "react";
import './Home.css';
import Header from '../Components/Header/Header.js';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            title: "DOCTOR DIARY",
            role: "CHOOSE ROLE",
            button1: "DOCTOR",
            button2: "HEALTH OFFICER",
        }
    }
    render () {
        return(
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                    <h1> {this.state.role} </h1>

                    <a href='doctor' className="Home-button">{this.state.button1}</a>

                    <a href='healthofficer' className="Home-button">{this.state.button2}</a>
            </main>
            </div>
        )
    }
}
