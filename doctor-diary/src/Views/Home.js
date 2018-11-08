import React, { Component } from "react";
import './Home.css';
//import header from './Components/Header' kan så legge <Header /> øverst i HTML
//import footer from './Components/Footer' kan så legge til <Footer /> nederst i HTML

export default class Home extends Component {
    state = {

    }
    render () {
        return(
            <div className="Home">
                <header className="Home-header">
                    <button>
                        <a className="Home-link" href='doctor'>
                        <h1>Doctor</h1>
                        </a>
                    </button>

                    <button>
                        <a className="Home-link" href='healthofficer'>
                        <h1>Health Officer</h1>
                        </a>
                    </button>

            </header>
            </div>
        )
    }
}
