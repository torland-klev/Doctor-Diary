import React, { Component } from 'react';


export default class DoctorHome extends Component {
    state = {

    }
    render () {
        return(
            <div className="Home">
                <header className="Home-header">
                    <button>
                        <a className="Home-link" href='/'>
                        <h1>Go back</h1>
                        </a>
                    </button>
                    <button>
                        <a className="NewEntry" href='newEntry'>
                        <h1>New entry</h1>
                        </a>
                    </button>
            </header>
            </div>
        )
    }
}
