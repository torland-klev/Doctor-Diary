import React, { Component } from "react";
import './Home.css';
import logo from '../logo.svg';
//import header from './Components/Header' kan så legge <Header /> øverst i HTML
//import footer from './Components/Footer' kan så legge til <Footer /> nederst i HTML

export default class Home extends Component {
    state = {

    }
    render () {
        return( 
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href='test'>
                Go to test page
                </a>
            </header>
            </div>
        )
    }
}