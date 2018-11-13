import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';


export default class ConfirmSendReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Confirm Report",
            backbutton: "Back to new Entry",
            backbuttonlink: '/doctor/newEntry',
        };
    }
    render () {
        return (
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
                </main>
            </div>
          )
    }
}
