import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import ConfirmSendReport from './ConfirmSendReport'

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            backbutton: "Go to homepage",
            backLink: "/",
            pendingButton: "Pending",
            pendingLink: "doctor/pending",
            declinedButton: "Declined",
            declinedLink: "doctor/declined",
            newButton: "New entry",
            newLink: "doctor/newEntry",
            homeLink: '/doctor'

        }
    }

    componentWillMount(){

        //Checks if there are reports for sending
        
    
        console.log("WillMount");
        var itemKeys = Object.keys(localStorage);
        console.log(itemKeys);

        for(var i = 0; i < itemKeys.length; i++){
            
            var isOnline = window.navigator.onLine;
            
            if(itemKeys[i].startsWith("TOSEND") && isOnline){
                

                var programID = "r6qGL4AmFV4";
                var orgUnitID = "";
                var teiID = "";
                var programStageID = "";

                var self = this;
                
                //Sjekk senere etter API flytting.
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
        }
    }

    
    render () {
        return (
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                        <a href={this.state.pendingLink}>
                            <button>{this.state.pendingButton}</button>
                        </a>
                        <a href={this.state.declinedLink}>
                            <button>{this.state.declinedButton}</button>
                        </a>
                        <a href={this.state.newLink}>
                            <button>{this.state.newButton}</button>
                        </a>
                </main>
            </div>
          )
    }
}
