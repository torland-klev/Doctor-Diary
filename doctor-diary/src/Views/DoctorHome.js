import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

export default class DoctorHome extends Component {
    state = {

    }
    render () {
        return (
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
            </header>

          </div>
        )
    }
}
