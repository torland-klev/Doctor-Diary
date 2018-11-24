import React, { Component } from "react";
import Header from '../Components/Header/Header.js';



export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            title: "DOCTOR DIARY",
            text: "You do not have a valid role"
        }
    }
    render () {
        return(
            <div>
                <Header title={this.state.title} />
                <main>
                You either don't have the authorization to use this app or the server is down.
                </main>
            </div>
        );
    }
}
