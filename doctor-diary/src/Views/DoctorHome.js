import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from '../Components/Header.js';


export default class DoctorHome extends Component {
    state = {

    }
    render () {
<<<<<<< HEAD
        return (
          <div className="wrapper">
            <header>
              <h1>Doctor Diary</h1>
                <button>
                    <a className="Home-link" href='doctor/pending'>
                    <h1>Pending</h1>
                    </a>
                </button>
                <button>
                    <a className="NewEntry" href='doctor/newEntry'>
                    <h1>New Entry</h1>
                    </a>
                </button>
                <button>
                    <a className="Home-link" href='doctor/declined'>
                    <h1>Declined</h1>
                    </a>
                </button>
                <div className="Home">
                    <Header />
                    <header>
                    <h1>Doctor Diary</h1>
                        <button>
                            <a href='/'>Go back</a>
                        </button>
                    </header>
                </div>
              </header>
=======
        return(
            <div className="Home">
                <Header />
                <main className="Home-main">
                    <h1>Doctor Diary</h1>
                    <a href='newEntry' className="Home-button">New entry</a>
                    <a href='/' className="Home-button">Go back</a>
                </main>
>>>>>>> f7b1b7d6fc46b56cc6678f2ccde28ec9d39d5261
            </div>
          )
    }
}
