import React, { Component } from "react";
import './Home.css';
import Header from '../Components/Header.js';
//import header from './Components/Header' kan så legge <Header /> øverst i HTML
//import footer from './Components/Footer' kan så legge til <Footer /> nederst i HTML

export default class Home extends Component {
    state = {

    }
    render () {
        return(
            <div className="Home">
                <Header />
                <main className="Home-main">
                    <h1> CHOOSE ROLE </h1>

                    <a href='doctor' className="Home-button">DOCTOR</a>

                    <a href='healthofficer' className="Home-button">HEALTH OFFICER</a>
            </main>
            </div>
        )
    }
}
