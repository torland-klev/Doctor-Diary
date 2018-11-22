import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            backbutton: "Go to homepage",
            backLink: "/",
            pendingButton: "Pending",
            pendingLink: "doctor/pending",
            declinedButton: "Declined",
            declinedLink: "doctor/declined",
            newButton: "New entry",
            newLink: "doctor/newEntry",
            homeLink: '/doctor'

        }
    }
    render () {
        return (
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                        <a href={this.state.pendingLink}>
                            <button>{this.state.pendingButton}</button>
                        </a>
                        <a href={this.state.declinedLink}>
                            <button>{this.state.declinedButton}</button>
                        </a>
                        <a href={this.state.newLink}>
                            <button>{this.state.newButton}</button>
                        </a>
                </main>
            </div>
          )
    }

    //<Link to={{pathname: '/doctor/newEntry', state: {importList: this.state.dataElements}}}>
    //<div>asdasd</div>
    //</Link>
}
