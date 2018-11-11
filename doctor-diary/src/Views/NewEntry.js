import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';

export default class NewEntry extends Component {
    constructor() {
        super();
        this.state = {
            title: "NEW ENTRY",
            backbutton: "Back to doctor",
            backbuttonlink: "/doctor",
        }
    }
    render () {
        return(
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                    <label name="entrydesctription">No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning)</label>
                    <input type="text" name="nyttelement" id="nyttelement" placeholder="New element" />

                    <label name="entrydesctription">Anaesthesia provided to other cases</label>
                    <input type="text" name="elementTwo" id="elementTwo" placeholder="..." />

                    <label name="entrydesctription">Challenges faced</label>
                    <input type="text" name="elementThree" id="elementThree" placeholder="..." />

                    <label name="entrydesctription">Challenges faced: Other</label>
                    <input type="text" name="elementFour" id="elementFour" placeholder="..." />

                    <label name="entrydesctription">Remarks/ Feedback/ Details of Challenges faced</label>
                    <input type="text" name="elementFive" id="elementFive" placeholder="..." />

                    <label name="entrydesctription">No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM</label>
                    <input type="text" name="elementSix" id="elementSix" placeholder="..." />

                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
                </main>
            </div>
        )
    }
}
