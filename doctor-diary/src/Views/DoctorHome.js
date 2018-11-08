import React, { Component } from 'react';

export default class DoctorHome extends Component {
    state = {

    }
    render () {
        return (
            <div>
                <header>
                <h1>Doctor Diary</h1>
                <form id='form'>
                    <button id='submit'>
                        <a className='Home-link' href='/'>Go back</a>
                    </button>
                </form>
            </header>
            </div>
        )
    }
}