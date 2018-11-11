import React, { Component } from 'react';
import Header from '../Components/Header.js';
import BackButton from '../Components/Button/BackButton.js'

export default class HealthOfficerHome extends Component {
    state = {

    }
    render() {
        const title = "HEALTH OFFICER";
        const backbutton = "Previous";
        const backbuttonlink = "/"
        return (
            <div className="Home">
                <Header title={title} />
                <main className="Home-main">
                    <BackButton title={backbutton} link={backbuttonlink} />
                </main>
            </div>
        )
    }

}
