import React, { Component } from 'react';
import Header from '../Components/Header.js';

class Declined extends Component {
    state = {

    }
    render() {
        return (
            <div className="Home">
                <Header />
                <main className="Home-main">
                    <h1>Declined reports</h1>
                    <a href='/doctor' className="Home-button">Go back</a>
                </main>
            </div>
        )
    }
}

export default Declined;
