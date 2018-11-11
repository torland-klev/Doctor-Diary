import React, { Component } from "react";
import './Home.css';
import Header from '../Components/Header/Header.js';

export default class Home extends Component {
    state = {

    }
    render () {
        const title = "DOCTOR DIARY"
        const role = "CHOOSE ROLE"
        const button1 = "DOCTOR"
        const button2 = "HEALTH OFFICER"
        return(
            <div className="Home">
                <Header title={title}/>
                <main className="Home-main">
                    <h1> {role} </h1>

                    <a href='doctor' className="Home-button">{button1}</a>

                    <a href='healthofficer' className="Home-button">{button2}</a>
            </main>
            </div>
        )
    }
}
