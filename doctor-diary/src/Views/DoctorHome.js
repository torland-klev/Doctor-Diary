import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import Button from '../Components/Button/Button.js'
import NewButton from '../Components/Button/NewButton.js';


export default class DoctorHome extends Component {
    state = {

    }
    render () {
        const title = "DOCTOR";
        const backbutton = "Previous";
        const backbuttonlink = "/";
        const pendingButton = "Pending";
        const pendingButtonLink = "doctor/pending";
        const declinedButton = "Declined";
        const declinedButtonLink = "doctor/declined";
        const newButton = "New Entry";
        const newButtonLink = "doctor/newEntry";
        return (
            <div className="Home">
                <Header title={title}/>
                <main className="Home-main">
                    <BackButton title={backbutton} link={backbuttonlink} />
                    <Button title={pendingButton} link={pendingButtonLink} />
                    <Button title={declinedButton} link={declinedButtonLink} />
                    
                </main>
                <footer>
                    <NewButton title={newButton} link={newButtonLink} />
                </footer>
            </div>
          )
    }
}
