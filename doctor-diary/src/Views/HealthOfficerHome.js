import React, { Component } from 'react';
import Header from '../Components/Header.js';

export default class HealthOfficerHome extends Component {
    state = {

    }
    render() {
        return (
            <div className="Home">
                <Header />
                <main>
                <h1>Health Officer Home</h1>
                    <button>
                        <a className='Home-link' href='/'>Go back</a>
                    </button>
                </main>
            </div>
        )
    }

}
