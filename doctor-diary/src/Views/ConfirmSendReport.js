import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';


export default class ConfirmSendReport extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: "Confirm Report",
            backbutton: "Back to new Entry",
            backbuttonlink: '/doctor/newEntry',
            report: {},
        };
        this.componentWillMount = this.componentWillMount.bind(this)
        this.testMetode = this.testMetode.bind(this)
    }


    componentWillMount() {
        console.log("componentWillMount");
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        var fullDate = day + month + year;
        var obj = localStorage.getItem(fullDate);
        var parsedReport = JSON.parse(obj);
        var one = parsedReport.one;
        var two = parsedReport.two;
        var three = parsedReport.three;
        var four = parsedReport.four;
        var five = parsedReport.five;
        var six = parsedReport.six;
        var tmpReport = {fullDate:+fullDate, one:+one, two:+two, three:+three, four:+four, five:+five, six:+six};
        this.setState({report: tmpReport});
        console.log("tmpReport.one: " + tmpReport.one);
        var reportHeadline = document.getElementById("reportHeadline");
    }

    testMetode() {
      return this.state.report.one;
    }


    render () {
        return (

            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                <div dangerouslySetInnerHTML={testMetode} />

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

                <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

                </main>
            </div>
          )
    }
}
