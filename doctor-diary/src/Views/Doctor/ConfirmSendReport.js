import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import BackButton from '../../Components/Button/BackButton.js';

/** Skal ikke være her i deployment */
const authKey = 'Basic ' + btoa("AkselJ:District1-");
const baseURL = "https://course.dhis2.org/dhis/api";


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
        console.log("parsedReport: " + parsedReport)
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

            console.log(valueElement);
            values.push(valueElement);
        })

        var programID = "r6qGL4AmFV4";
        var orgUnitID = "";
        var teiID = "";
        var programStageID = "";

        var self = this;

        var isOnline = window.navigator.onLine;

        if(isOnline){

            this.findProgramStage(programID).then(function (pStage){

                console.log("programStage: " + pStage);
                programStageID = pStage;

                self.findTeiOrgUnit().then(function (orgUnit){

                    console.log("orgUnitID: " + orgUnit);
                    orgUnitID = orgUnit;

                    self.findTrackedEntityInstance(orgUnit, programID).then(function (tei){

                        console.log("teiID: " + tei);
                        teiID = tei;

                        const newEvent = {
                            program: programID,
                            trackedEntityInstance: teiID,
                            programStage: programStageID,
                            orgUnit: orgUnitID,
                            dataValues: values
                        };

                        self.sendDataToApi(newEvent);
                        self.setState({status: "Report sent successfully"});
                    })
                })
            })

        }else{

            localStorage.setItem("TOSEND_" + this.state.fullDate, JSON.stringify(values));
            this.setState({status: "No internett. Will send once reconnected."});
            //NO INTERNET
            console.log("LAGRET UTEN INTERNET!!!");
        }
    }

    findTeiOrgUnit(){

        var TeiOrgUnitID = "";

        return fetch(baseURL + "/me", {
            method: 'GET',
            headers: {
              'Authorization': authKey
            }
          }).then(function (response){
            return response.json();
          }).then(function (data){

            TeiOrgUnitID = data.teiSearchOrganisationUnits[0].id;

            return TeiOrgUnitID;
          })

    }

    findTrackedEntityInstance(teiOrgID, programID){

        var trackedEntityID = "";

        var filters = "/trackedEntityInstances.json?ou=" + teiOrgID + "&program=" + programID;

        console.log(filters);
        return fetch(baseURL + filters, {
            method: 'GET',
            headers: {
              'Authorization': authKey
            }
          }).then(function (response){
            return response.json();
          }).then(function (data){

            //console.log(data);
            trackedEntityID = data.trackedEntityInstances[0].trackedEntityInstance;
            //console.log(data.trackedEntityInstances[0]);
            return trackedEntityID;
          })
    }

    findProgramStage(){

        var programID = "r6qGL4AmFV4"; //Hardcoded 'Anaesthetist - PBR monitoring' ID
        var programStageID = "";

        return fetch(baseURL + "/programs/" + programID, {
          method: 'GET',
          headers: {
            'Authorization': authKey
          }
        }).then(function (response){
          return response.json();
        }).then(function (data){

            programStageID = data.programStages[0].id;

            return programStageID;
        })
    }

    sendDataToApi(eventElement){

        fetch("https://course.dhis2.org/dhis/api/events", {
          method: 'POST',
          //credentials: 'include', //skal være med på deploy
          mode: 'cors',
          headers: {
            'Authorization': authKey, //FJERNES VED DEPLOY
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(eventElement)
        }).then(function(response) {

          //console.log(response);
          return response.json();
        }).then(function(data) {

          console.log(data);
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

                    <button onClick={() => this.sendData()}>test send</button>
                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

                    <div className="NewButtonContainer">
                        <a href={this.state.backbuttonlink}><div className='ReportPageButton'>{this.state.backbutton}</div></a>
                    </div>
                    
                </main>
            </div>
          )
    }



}
