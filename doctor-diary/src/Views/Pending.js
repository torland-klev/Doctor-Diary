import React, { Component } from 'react';
import Header from '../Components/Header.js';

class Pending extends Component {
    state = {

    }
    render() {
        return (
            <div className='Home'>
                <Header />
                <main className='Home-main'>
                    <h1>Pending reports</h1>
                    <a href='/doctor' className='Home-button'>Go back</a>
                </main>
            </div>
        )
    }
}
export default Pending;
