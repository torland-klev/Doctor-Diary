import React, { Component } from 'react';
import Header from '../Components/Header.js';

export default class NewEntry extends Component {
    state = {

    }
    render () {
        return(
            <div className="Home">
                <Header />
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

                    <a href='/doctor' className="Home-button">Go back</a>
                </main>
            </div>
        )
    }
}
