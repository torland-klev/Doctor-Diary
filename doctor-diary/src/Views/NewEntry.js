/* Take in data from user, and saves it to local storage when "next"-button is pressed.
The next-button also redirects to next page that will contain an overview over the report and
a "send"-button that will send the data to the API.
NB: It uses date as key, so it assumes that only one doctor will be using the browser. */

import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import NextButton from '../Components/Button/NextButton.js';
import DataElementForm from '../Components/DataElementForm.js';

export default class NewEntry extends Component {



  constructor(props) {
      super(props);
      this.state = {
            dataElements: [{name: "Element one", valueType: "kristne verdier", id: "101"}, {name: "Element two", valueType: "okonomiske verdier", id: "007"}],
            dataToBeStored: [],
            fullDate: "",
            rows: [],
            title: "NEW ENTRY",
            backbutton: "Back to doctor",
            backbuttonlink: "/doctor",
            nextButton: "New",
            nextButtonLink: '/doctor/newEntry/confirmSendReport',
            tmpId: null,
            tmpDataFromChild: null,
      };
      this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
      this.updateData = this.updateData.bind(this)
      this.myCallback = this.myCallback.bind(this)
      this.getDataContent = this.getDataContent.bind(this)
      this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this)
  }



  saveToLocalStorage() {
      localStorage.setItem(this.state.fullDate, JSON.stringify(this.state.dataToBeStored));
  }


    updateData(id, dataFromChild) {
        console.log("dataToBeStored.length: " + this.state.dataToBeStored.length)
        if (this.state.tmpId != null && this.state.tmpDataFromChild != null) {
            for (var i=0; i<this.state.dataToBeStored.length; i++) {
                if (this.state.dataToBeStored[i].id == id) {
                    console.log(this.state.dataToBeStored[i])
                    this.state.dataToBeStored[i].dataContent = this.state.tmpDataFromChild;
                    break;
                }
            }
        }
        this.state.tmpDataFromChild = null
        this.state.tmpId = null
    }


    myCallback(id, dataFromChild) {
          this.setState({tmpDataFromChild: dataFromChild, tmpId: id})
    }


    loadFromLocalStorage() {
        this.state.dataToBeStored = [];
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
            if (this.state.dataToBeStored[i].id == id) {
                fieldValue = this.state.dataToBeStored[i].dataContent;
                break;
            }
        }
        return fieldValue;
    }


    addToList(element) {
        var isNew = true;
        for (var i=0; i<this.state.dataToBeStored.length; i++) {
            if (this.state.dataToBeStored[i].id == element.id) {
                this.state.dataToBeStored[i].dataContent = element.dataContent
                isNew = false
            }
        }
        if (isNew) {
            this.state.dataToBeStored.push(element)
        }
    }


    componentWillMount() {
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        this.state.fullDate = day + "." + month + "."+ year;
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
        this.updateData(this.state.tmpId, this.state.tmpDataFromChild);
        return(
            <table>
                <tbody>
                    {this.state.rows}
                </tbody>
                <a a href='/doctor/newEntry/confirmSendReport' onClick={this.saveToLocalStorage} className="Home-button">Next</a>
                <a href='/doctor' className='Home-button'>Back</a>
            </table>
        );
    }



}
