import React, { Component } from 'react';
import Header from '../Components/Header.js';

export default class HealthOfficerHome extends Component {
    state = {

    }
    render() {
        return (
            <div className="Home">
                <Header />
                <main className="Home-main">
                    <h1>Health Officer Home</h1>
                    <a href='/' className="Home-button">Go back</a>
                </main>
            </div>
        )
    }

}
