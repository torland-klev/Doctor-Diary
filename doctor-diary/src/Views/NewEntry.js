/* Take in data from user, and saves it to local storage when "next"-button is pressed.
The next-button also redirects to next page that will contain an overview over the report and
a "send"-button that will send the data to the API.
NB: It uses date as key, so it assumes that only one doctor will be using the browser. */

import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';

export default class NewEntry extends Component {

  constructor(props) {
      super(props);
      this.state = {
            hei: {},
            title: "NEW ENTRY",
            backButton: "Back",
            backButtonLink: "/doctor",
            nextButton: "Next",
            nextButtonLink: '/doctor/newEntry/confirmSendReport',
      };
      this.updateData = this.updateData.bind(this)
      this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
  }


    saveToLocalStorage() {
        localStorage.setItem(this.state.hei.fullDate, this.state.hei);
    }


    updateData() {
        var one = document.getElementById("elementOne").value;
        console.log("one: " + one);
        var two = document.getElementById("elementTwo").value;
        console.log("two: " + two);
        var three = document.getElementById("elementThree").value;
        console.log("three: " + three);
        var four = document.getElementById("elementFour").value;
        console.log("four: " + four);
        var five = document.getElementById("elementFive").value;
        console.log("five: " + five);
        var six = document.getElementById("elementSix").value;
        console.log("six: " + six);
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        var fullDate = day + month + year;
        var report = {fullDate:+fullDate, one:+one, two:+two, three:+three, four:+four, five:+five, six:+six};
        this.setState({hei: report});
        console.log("report.fullDate: " + report.fullDate, "report.one: "+report.one, "report.two: "+report.two, "report.three: "+ report.three,
        "report.four: " + report.four, "report.five: " + report.five, "report.six: " + report.six);
    }


    render () {
        return(
            <div className="Home">
                <Header title={this.state.title} />
                <main>
                    <div className="NewEntry-section">
                        <label name="entrydesctription">No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning):</label>
                        <input type="text" name="elementOne" onKeyUp={this.updateData} className="NewEntry-input" id="elementOne" placeholder="..." />
                    </div>
                    <div className="NewEntry-section">
                        <label name="entrydesctription">Anaesthesia provided to other cases:</label>
                        <input type="text" name="elementTwo" onKeyUp={this.updateData} className="NewEntry-input" id="elementTwo" placeholder="..." />
                    </div>
                    <div className="NewEntry-section">
                        <label name="entrydesctription">Challenges faced:</label>
                        <input type="text" name="elementThree" onKeyUp={this.updateData} className="NewEntry-input" id="elementThree" placeholder="..." />
                    </div>
                    <div className="NewEntry-section">
                        <label name="entrydesctription">Challenges faced: Other:</label>
                        <input type="text" name="elementFour" onKeyUp={this.updateData} className="NewEntry-input" id="elementFour" placeholder="..." />
                    </div>
                    <div className="NewEntry-section">
                        <label name="entrydesctription">Remarks/ Feedback/ Details of Challenges faced:</label>
                        <input type="text" name="elementFive" onKeyUp={this.updateData} className="NewEntry-input" id="elementFive" placeholder="..." />
                    </div>
                    <div className="NewEntry-element">
                        <label name="entrydesctription">No TEST of Emergency Cesearean Cases provided anaesthesia during day till 5PM:</label>
                        <input type="text" name="elementSix" onKeyUp={this.updateData} className="NewEntry-input" id="elementSix" placeholder="..." />
                    </div> 
                   
                   <div className="TemporaryContainer">
                        <form>
                            <button formaction={this.state.backButtonLink}> {this.state.backButton} </button>
                        </form>
                        <form>
                            <button formaction={this.state.nextButtonLink} onClick={this.saveToLocalStorage}> {this.state.nextButton} </button>
                        </form>
                    </div>
                </main>

            </div>

        );
    }
}
