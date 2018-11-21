import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton';

class Declined extends Component {
    constructor (){
        super();
        this.state = {
            title: "Declined reports",
            backbutton: "Back to doctor",
            backLink: "/doctor",
        }
    }
    render() {
        return (
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">
                    <BackButton title={this.state.backbutton} link={this.state.backLink} />
                </main>
            </div>
        )
    }
}

export default Declined;
