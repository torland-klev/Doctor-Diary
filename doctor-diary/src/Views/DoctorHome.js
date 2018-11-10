import React, { Component } from 'react';
import Header from '../Components/Header.js';

export default class DoctorHome extends Component {
    state = {

    }
    render () {
        return (
            <div className="Home">
                <Header />
                <main>
                <h1>Doctor Diary</h1>
                    <button>
                        <a href='/'>Go back</a>
                    </button>
                </main>
            </div>
        )
    }
}