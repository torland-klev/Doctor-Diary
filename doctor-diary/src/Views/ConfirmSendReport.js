import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';


export default class ConfirmSendReport extends Component {
<<<<<<< HEAD

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
=======
    constructor(props) {
        super(props);
        this.state = {
            title: "Confirm Report",
            backbutton: "Back to new Entry",
            backbuttonlink: '/doctor/newEntry',
        };
>>>>>>> de0cc8e1383cfd72cef693f9013569df54a3008c
    }


    render () {
        return (
            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">
<<<<<<< HEAD
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
=======

                <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
>>>>>>> de0cc8e1383cfd72cef693f9013569df54a3008c
                </main>
            </div>
          )
    }
}
