/* Take in data from user, and saves it to local storage when "next"-button is pressed.
The next-button also redirects to next page that will contain an overview over the report and
a "send"-button that will send the data to the API.
NB: It uses date as key, so it assumes that only one doctor will be using the browser. */

import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';

import DataElementForm from '../../Components/DataElementForm.js';

const baseURL = "https://course.dhis2.org/dhis/api";
var userNew = "AkselJ" //doctor
var passNew = "District1-" //hardkodet for nå
var authKey = 'Basic ' + btoa(userNew + ':' + passNew);

export default class NewEntry extends Component {
  constructor(props) {
      super(props);
      this.state = {
            title: "NEW ENTRY",
            backButton: "Back",
            backButtonLink: "/doctor",
            nextButton: "Next",
            nextButtonLink: '/doctor/newEntry/confirmSendReport',
            active: '#43CBCB',
            dataToBeStored: [],
            fullDate: "",
            rows: [],
            tmpId: null,
            tmpDataFromChild: null
      };
      this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
      this.updateData = this.updateData.bind(this)
      this.myCallback = this.myCallback.bind(this)
      this.getDataContent = this.getDataContent.bind(this)
      this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this)

      this.fetchDataElements = this.fetchDataElements.bind(this)
      this.findDataElementIDs = this.findDataElementIDs.bind(this)
      this.findDataElementContent = this.findDataElementContent.bind(this)
  }


  saveToLocalStorage() {
    localStorage.setItem(this.state.fullDate, JSON.stringify(this.state.dataToBeStored));
  }


  updateData(id, dataFromChild) {

    if (this.state.tmpId != null && this.state.tmpDataFromChild != null) {
        /*for (var i=0; i<this.state.dataToBeStored.length; i++) {
            if (this.state.dataToBeStored[i].id === id) {
                console.log(this.state.dataToBeStored[i])
                this.state.dataToBeStored[i].dataContent = this.state.tmpDataFromChild;
                break;
            }
        }*/

        this.state.dataToBeStored.forEach((e) => {
            if(e.id === id) {
                e.setState({dataContent: this.state.tmpDataFromChild})
                return;
            }
        })
    }
    this.setState({tmpDataFromChild: null});
    this.setState({tmpId: null});
}



    myCallback(id, dataFromChild) {
          this.setState({tmpDataFromChild: dataFromChild, tmpId: id})
    }


    loadFromLocalStorage() {
        this.setState({dataToBeStore: []})
        var l = localStorage.getItem(this.state.fullDate)
        var lista = JSON.parse(l)
        if (lista != null) {
          lista.forEach((el) => {
              var id = el.id
              var name = el.name
              var dataContent = el.dataContent
              var nextElement = {id: id, name: name, dataContent: dataContent}
              this.state.dataToBeStored.push(nextElement);
          })
          localStorage.removeItem(this.state.fullDate)
        }
    }


    getDataContent(id) {
        var fieldValue = null
        for (var i=0; i<this.state.dataToBeStored.length; i++) {
            if (this.state.dataToBeStored[i].id === id) {
                fieldValue = this.state.dataToBeStored[i].dataContent;
                break;
            }
        }
        return fieldValue;
    }


    addToList(element) {
        var isNew = true;
        /*for (var i=0; i<this.state.dataToBeStored.length; i++) {
            if (this.state.dataToBeStored[i].id === element.id) {
                this.state.dataToBeStored[i].dataContent = element.dataContent
                isNew = false
            }
        }*/
        this.state.dataToBeStored.forEach((e) => {
            if(e.id === element.id) {
                e.setState({dataContent: element.dataContent})
                isNew = false;
            }
        })
        if (isNew) {
            this.state.dataToBeStored.push(element)
        }
    }


    fetchDataElements(_callback){

        var ref_findDataElementContent = this.findDataElementContent;

        this.findDataElementIDs().then(function (result){

            var dataElementIDs = result;
            var dataElementContent = [];

            for(var i = 0; i < dataElementIDs.length; i++){
              dataElementContent.push(ref_findDataElementContent(dataElementIDs[i]));
            }

            Promise.all(dataElementContent).then(function (dataObjects){

                _callback(dataObjects);
            })
          })

    }


    findDataElementIDs(){

        var programID = "r6qGL4AmFV4"; //Hardcoded 'Anaesthetist - PBR monitoring' ID
        var programStageID = "";
        var dataElementIDs = [];

        return fetch(baseURL + "/programs/" + programID, {
          method: 'GET',
          headers: {
            'Authorization': authKey
          }
        }).then(function (response){
          return response.json();
        }).then(function (data){

            programStageID = data.programStages[0].id;

            return fetch(baseURL + "/programStages/" + programStageID,{
              method: 'GET',
              headers: {
              'Authorization': authKey
              }
            }).then(function (response){

                return response.json();

            }).then(function (data){

                data.programStageDataElements.forEach((element) => {

                  dataElementIDs.push(element.dataElement.id);
                })

                return dataElementIDs;
            })

        })
      }


    findDataElementContent(id){
    return fetch(baseURL + "/dataElements/" + id, {
        method: 'GET',
        headers: {
        'Authorization': authKey
        }
    }).then(function (response){
        return response.json().then(function (data){

        var newElement = {
            "name": data.name,
            "id": data.id,
            "valueType": data.valueType,
        };

        return newElement;
        }).catch(function (error){

        //console.log(error);
        })
    })
    }


    componentWillMount() {
        var self = this;

        this.fetchDataElements(function(objList){

            var d = new Date();
            var year = String(d.getFullYear());
            var month = String(d.getMonth());
            var day = String(d.getDate());
            self.state.fullDate = day + "." + month + "."+ year;
            self.loadFromLocalStorage();

            var elements = objList;

            elements.forEach((el) => {

                var nextId = el.id
                var nextName = el.name
                var nextValueType = el.valueType
                var nextDataContent = self.getDataContent(nextId)

                //Approved/Rejected Current Status is not shown to doctor
                if(nextName === "Approved/Rejected Current Status"){
                    nextDataContent = "Pending";
                }else{
                    var newDataElementForm = React.createElement(DataElementForm, {id: nextId, name: nextName, valueType: nextValueType, dataContent: nextDataContent, callbackFromParent: self.myCallback}, null)
                    var htmlDataElementContainer = React.createElement("div", null, newDataElementForm)
                    self.state.rows.push(htmlDataElementContainer)
                }

                var newToBeStored = {id: nextId, name: nextName, dataContent: nextDataContent, valueType: nextValueType};
                self.addToList(newToBeStored)
            })

            self.setState({ state: self.state }); //Force re-render

        })

    }


    render () {
        this.updateData(this.state.tmpId, this.state.tmpDataFromChild);
        return(
            <div>
                <Header title={this.state.title} />
                <main>
                    <table>
                        <tbody>
                            {this.state.rows}
                        </tbody>
                        <div id="errorMessage" type="text"></div>
                        <a href='/doctor/newEntry/confirmSendReport' onClick={this.saveToLocalStorage} className="Home-button">Next</a>
                        <a href='/doctor' className='Home-button'>Back</a>
                    </table>
                    <div className="NewButtonContainer">
                        <a href='/doctor'><div className='ReportPageButton'>Back</div></a>
                        <a href='/doctor/newEntry/confirmSendReport' onClick={this.saveToLocalStorage}><div className='ReportPageButton'>Next</div></a>
                    </div>
                </main>
                <NavBar addFill={this.state.active}/>
            </div>
        );
    }
}
