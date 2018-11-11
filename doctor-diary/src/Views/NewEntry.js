import React, { Component } from 'react';
import Header from '../Components/Header.js';

export default class NewEntry extends Component {
    state = {

    }
    render () {
        return(
            <div className="Home">
                <Header />
                <main className="Home-main">
                    <label name="entrydesctription"><p>No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning)</p></label>
                    <input type="text" name="nyttelement" id="nyttelement"
                       placeholder="New element" />
                    <a href='/doctor' className="Home-button">Go back</a>
                </main>
            </div>
        )
    }
}
