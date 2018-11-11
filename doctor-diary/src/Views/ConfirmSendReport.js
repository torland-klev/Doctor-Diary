import React, { Component } from 'react';
import Header from '../Components/Header.js';


export default class ConfirmSendReport extends Component {
    state = {

    }
    render () {
        return (
            <div className="Home">
                <Header />
                <main className="Home-main">
                <h1>ConfirmSendReport</h1>
                <a href='/doctor/newEntry' className="Home-button">Go back</a>
                </main>
            </div>
          )
    }
}
