import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton';
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
        }
    }
    render() {
        return (
            <div className='Home'>
                <Header title={this.state.title} />
                <main className='Home-main'>
                    <BackButton title={this.state.backbutton} link={this.state.backLink} />
                </main>
            </div>
        )
    }
}
export default Pending;
