import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import IconSend from '../../Components/Button/IconSend.js';
import IconBack from '../../Components/Button/IconBack.js';
import '../../Components/Components.css'

import Api from '../../Api.js';


export default class ConfirmSendReport extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: "Confirm Report",
            backbutton: "Back to new Entry",
            backbuttonlink: '/doctor/newEntry',
            report: {},
            rows: [],
            fullDate: "",
            status: ""
        };
        this.componentWillMount = this.componentWillMount.bind(this)
        this.sendData = this.sendData.bind(this)
    }


    componentWillMount() {
        var d = new Date();
        var year = String(d.getFullYear())
        var month = String(d.getMonth())
        var day = String(d.getDate())
        this.state.fullDate = day + "." + month + "." + year
        var obj = localStorage.getItem(this.state.fullDate)
        var parsedReport = JSON.parse(obj)
        parsedReport.forEach((el) => {

            if(!(el.name === "Approved/Rejected Current Status")){
                this.state.rows.push(<tr><p type="text" id={el.name}>{el.name}:</p></tr>)
                this.state.rows.push(<tr><p type="text" id={el.dataContent}>{el.dataContent}</p></tr>);
            }

        })

        this.setState({report: parsedReport})

    }

    sendData(){

        var objects = this.state.report;

        var values = [];

        objects.forEach((obj) => {
            var valueElement = {
                dataElement: obj.id,
                value: obj.dataContent,
            };

            values.push(valueElement);
        })

        var programID = "r6qGL4AmFV4";
        var orgUnitID = "";
        var teiID = "";
        var programStageID = "";

        var self = this;

            Api.findProgramStage(programID).then(function (pStage){

                programStageID = pStage;

                Api.findTeiOrgUnit().then(function (orgUnit){

                    orgUnitID = orgUnit;

                    Api.findTrackedEntityInstance(orgUnit, programID).then(function (tei){

                        teiID = tei;

                        const newEvent = {
                            program: programID,
                            trackedEntityInstance: teiID,
                            programStage: programStageID,
                            orgUnit: orgUnitID,
                            dataValues: values
                        };

                        Api.sendDataToApi(newEvent);
                        self.setState({status: "Report sent successfully"});
                    })
                })
            })
    }

    render () {
        return (this.state.status) ? (
          <div>
            <Header title={this.state.title} />
            <main>
              {this.state.status}
              <a href='/' className='ReportPageButton'>Home</a>
            </main>
          </div>
        )
        : (
            <div>
                <Header title={this.state.title} />
                <main>
                    <h2>Report for date {this.state.fullDate}</h2>

                    <table className="newEntryTable">
                        <tbody>
                            {this.state.rows}
                        </tbody>
                    </table>

                    <div className="NewButtonContainer">
                        <a href={this.state.backbuttonlink}><button className="ArrowButton"><IconBack /> <b>BACK</b></button></a>
                        <button className="SendButton" onClick={() => this.sendData()}> <IconSend /> <b>SEND</b></button>
                    </div>
                </main>
            </div>
          )
    }



}
