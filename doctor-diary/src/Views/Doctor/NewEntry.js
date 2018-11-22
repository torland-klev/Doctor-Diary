/* Take in data from user, and saves it to local storage when "next"-button is pressed.
The next-button also redirects to next page that will contain an overview over the report and
a "send"-button that will send the data to the API.
NB: It uses date as key, so it assumes that only one doctor will be using the browser. */

import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import {Link} from 'react-router-dom';

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
            dataElements: [{name: "Element one", valueType: "kristne verdier", id: "101"}, {name: "Element two", valueType: "okonomiske verdier", id: "007"}],
            //dataElements: [],
            dataToBeStored: [],
            fullDate: "",
            rows: [],
            tmpId: null,
            tmpDataFromChild: null,
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
        console.log("dataToBeStored.length: " + this.state.dataToBeStored.length)
        if (this.state.tmpId != null && this.state.tmpDataFromChild != null) {
            for (var i=0; i<this.state.dataToBeStored.length; i++) {
                if (this.state.dataToBeStored[i].id === id) {
                    console.log(this.state.dataToBeStored[i])
                    this.state.dataToBeStored[i].dataContent = this.state.tmpDataFromChild;
                    break;
                }
            }
        }
        this.setState({tmpDataFromChild: null}, {tmpID: null});
    }



    myCallback(id, dataFromChild) {
          this.setState({tmpDataFromChild: dataFromChild, tmpId: id})
    }


    loadFromLocalStorage() {
        this.setState({dataToBeStore: []})
        console.log("this.state.dataToBeStored.length : " + this.state.dataToBeStored.length)
        var l = localStorage.getItem(this.state.fullDate)
        var lista = JSON.parse(l)
        if (lista != null) {
          lista.forEach((el) => {
              var id = el.id
              var name = el.name
              var dataContent = el.dataContent
              var nextElement = {id: id, name: name, dataContent: dataContent}
              this.state.dataToBeStored.push(nextElement);
              console.log("Added element to dataToBeStored")
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
        for (var i=0; i<this.state.dataToBeStored.length; i++) {
            if (this.state.dataToBeStored[i].id === element.id) {
                this.state.dataToBeStored[i].dataContent = element.dataContent
                isNew = false
            }
        }
        if (isNew) {
            this.state.dataToBeStored.push(element)
        }
    }


    fetchDataElements(_callback){

        var ref_findDataElementContent = this.findDataElementContent;      
        var self = this;

        this.findDataElementIDs().then(function (result){

            var dataElementIDs = result;
            var dataElementContent = [];
      
            for(var i = 0; i < dataElementIDs.length; i++){
              dataElementContent.push(ref_findDataElementContent(dataElementIDs[i]));
              //console.log(dataElementIDs[i]);
            }
      
            Promise.all(dataElementContent).then(function (dataObjects){
              
                self.setState({dataElements: dataObjects})

                //console.log("STATE ARRAY: ", self.state.dataElements);
                _callback();
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

        /*
        var self = this;
        this.fetchDataElements(function(){
            console.log(self.state.dataElements);
            var d = new Date();
            var year = String(d.getFullYear());
            var month = String(d.getMonth());
            var day = String(d.getDate());
            self.state.fullDate = day + "." + month + "."+ year;
            self.loadFromLocalStorage()
            var elements = self.state.dataElements;
            elements.forEach((el) => {
            //this.state.rows.push(<tr><p type="text" id={el.name}>{el.name}</p></tr>)
            var nextId = el.id
            var nextName = el.name
            var nextDataContent = self.getDataContent(nextId)
            console.log("nextDataContent " + nextDataContent)
            //var newDataElementForm = React.createElement(DataElementForm, {id: nextId, name: nextName, dataContent:""}, React.createElement(DataElementForm))
            var newDataElementForm = React.createElement(DataElementForm, {id: nextId, name: nextName, dataContent: nextDataContent, callbackFromParent: self.myCallback}, null)
            var htmlDataElementContainer = React.createElement("div", null, newDataElementForm)
            self.state.rows.push(htmlDataElementContainer)
            var newToBeStored = {id: nextId, name: nextName, dataContent: ""};
            self.addToList(newToBeStored)
            })
        });
    
        */
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        this.setState({fullDate: day + "." + month + "."+ year});
        this.loadFromLocalStorage()
        var elements = this.state.dataElements;
        elements.forEach((el) => {
            //this.state.rows.push(<tr><p type="text" id={el.name}>{el.name}</p></tr>)
            var nextId = el.id
            var nextName = el.name
            var nextDataContent = this.getDataContent(nextId)
            console.log("nextDataContent " + nextDataContent)
            //var newDataElementForm = React.createElement(DataElementForm, {id: nextId, name: nextName, dataContent:""}, React.createElement(DataElementForm))
            var newDataElementForm = React.createElement(DataElementForm, {id: nextId, name: nextName, dataContent: nextDataContent, callbackFromParent: this.myCallback}, null)
            var htmlDataElementContainer = React.createElement("div", null, newDataElementForm)
            this.state.rows.push(htmlDataElementContainer)
            var newToBeStored = {id: nextId, name: nextName, dataContent: ""};
            this.addToList(newToBeStored)
        })
    }


    render () {
        return(
            <div className="Home">
            <Header title={this.state.title} />
            <main className="Home-main">
                <table>
                    <tbody>
                        {this.state.rows}
                    </tbody>
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
