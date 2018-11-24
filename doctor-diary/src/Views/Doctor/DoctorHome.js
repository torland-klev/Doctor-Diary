import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import MainReportList from '../../Components/Report/MainReportList.js';
import {Link} from 'react-router-dom';

const TEI_ID = "vjVNrMa4zvc";

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            newButton: "New entry",
            newLink: "doctor/newEntry",
            active: '#43CBCB'

        }
    }

    componentWillMount(){

        //Checks if there are reports for sending
        

        console.log("WillMount");
        var itemKeys = Object.keys(localStorage);
        console.log(itemKeys);
        /*
        for(var i = 0; i < itemKeys.length; i++){

            var isOnline = window.navigator.onLine;

            if(itemKeys[i].startsWith("TOSEND") && isOnline){


                var programID = "r6qGL4AmFV4";
                var orgUnitID = "";
                var teiID = "";
                var programStageID = "";

                var self = this;

                //Sjekk senere etter API flytting. confirmSend funksjonene skal ligge i /API!
                ConfirmSendReport.findProgramStage(programID).then(function (pStage){

                    console.log("programStage: " + pStage);
                    programStageID = pStage;

                    ConfirmSendReport.findTeiOrgUnit().then(function (orgUnit){
                        console.log("orgUnitID: " + orgUnit);
                        orgUnitID = orgUnit;

                        ConfirmSendReport.findTrackedEntityInstance(orgUnit, programID).then(function (tei){

                            console.log("teiID: " + tei);
                            teiID = tei;

                            const newEvent = {
                                program: programID,
                                trackedEntityInstance: teiID,
                                programStage: programStageID,
                                orgUnit: orgUnitID,
                                dataValues: localStorage.getItem(itemKeys[i])
                            };

                            ConfirmSendReport.sendDataToApi(newEvent);

                        })
                    })
                })

                localStorage.removeItem(itemKeys[i]);

            }
        } */
    }

    render () {
        return (
            <div>
                <Header title={this.state.title}/>
                <main>
                    <MainReportList id={TEI_ID} user="DOCTOR" />
                    <Link to={{pathname: this.state.newLink}}>
                      <div className="ReportPageButton">{this.state.newButton}</div>
                    </Link>
                </main>
                <NavBar homeFill={this.state.active}/>
            </div>
          )
    }
}
