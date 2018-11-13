import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';


export default class ConfirmSendReport extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.loadLocalStorage = this.loadLocalStorage.bind(this)
    }


    loadLocalStorage() {
      var d = new Date();
      var year = String(d.getFullYear());
      var month = String(d.getMonth());
      var day = String(d.getDate());
      var fullDate = day + month + year;
      this.setState({report: localStorage.getItem(fullDate)})
      //Maa sette innerHTML paa alle p-"objektene" til aa vaere data fra localStorage.
    }


    render () {
        return (
            <div className="Home">
                <Header />
                <main className="Home-main">
                <h1>Report created on (date)</h1>

                <label name="entrydesctription">No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning)</label>
                <p id="one"></p>

                <label name="entrydesctription">Anaesthesia provided to other cases</label>
                <p id="two"></p>

                <label name="entrydesctription">Challenges faced</label>
                <p id="three"></p>

                <label name="entrydesctription">Challenges faced: Other</label>
                <p id="four"></p>

                <label name="entrydesctription">Remarks/ Feedback/ Details of Challenges faced</label>
                <p id="five"></p>

                <label name="entrydesctription">No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM</label>
                <p id="six"></p>


                <a href='/doctor/newEntry' className="Home-button">Go back</a>
                </main>
            </div>
          )
    }
}
