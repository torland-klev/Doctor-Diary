//REMOVE?

import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import BackButton from '../../Components/Button/BackButton';
import NavBar from '../../Components/NavBar/NavBar.js';

class Pending extends Component {
    constructor() {
        super();
        this.state = {
            title: "Pending reports",
            backbutton: "Back to doctor",
            backLink: "/doctor",
            homeLink: "/doctor",
            declinedLink: "/doctor/declined",
            newLink: "/doctor/newEntry",
            active: '#43CBCB'
        }
    }
    render() {
        return (
            <div>
                <Header title={this.state.title} />
                <main>
                    <BackButton title={this.state.backbutton} link={this.state.backLink} />
                </main>
                <NavBar listFill={this.state.active}/>
            </div>
        )
    }
}
export default Pending;
