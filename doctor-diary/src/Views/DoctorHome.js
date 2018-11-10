import React, { Component } from 'react';
<<<<<<< HEAD
import {BrowserRouter, Route} from 'react-router-dom';
=======
import Header from '../Components/Header.js';
>>>>>>> 8a1b8a85d47721a38a60df363b80115417d7dca0

export default class DoctorHome extends Component {
    state = {

    }
    render () {
        return (
<<<<<<< HEAD
          <div className="wrapper">

            <header>
              <h1>Doctor Diary</h1>
                <button>
                  <a className='Home-link' href='/'>Go back</a>
                </button>
                <button>
                    <a className="Home-link" href='doctor/pending'>
                    <h1>Pending</h1>
                    </a>
                </button>
                <button>
                    <a className="Home-link" href='doctor/new'>
                    <h1>New</h1>
                    </a>
                </button>
                <button>
                    <a className="Home-link" href='doctor/declined'>
                    <h1>Declined</h1>
                    </a>
                </button>
=======
            <div className="Home">
                <Header />
                <header>
                <h1>Doctor Diary</h1>
                    <button>
                        <a href='/'>Go back</a>
                    </button>
>>>>>>> 8a1b8a85d47721a38a60df363b80115417d7dca0
            </header>

          </div>
        )
    }
}
