import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from '../Components/Header.js';


export default class DoctorHome extends Component {
    state = {

    }
    render () {
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
                    <a className="Home-link" href='doctor/newEntry'>
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
            </div>
          )
    }
}
