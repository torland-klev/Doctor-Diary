import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import DataElementForm from '../../Components/DataElementForm.js';
import Api from '../../Api.js';

/**
This is the view where the doctor creates a new report.
It takes in a list with the dataValues that is supposed to be in the report.
It creates components of DataElementForm. These components take in
data from user and stores it in dataToBeStored through a callback function.
If the dataValue is a comment or the status(Pending/Rejected/Approved) it
does not create a DataElementForm of it, because the user should not be
able to edit this.
When the user it finished and clicks next, the data for the report is stored
in localStorage, and it routes to ConfirmSendReport view.
**/

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
  }


  saveToLocalStorage() {
    localStorage.setItem(this.state.fullDate, JSON.stringify(this.state.dataToBeStored));
  }


  updateData(id, dataFromChild) {
    if (this.state.tmpId != null && this.state.tmpDataFromChild != null) {
      for (var i=0; i<this.state.dataToBeStored.length; i++) {
        if (this.state.dataToBeStored[i].id == id) {
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


  fetchDataElements(_callback){
    Api.findDataElementIDs().then(function (result){
      var dataElementIDs = result;
      var dataElementContent = [];
      for(var i = 0; i < dataElementIDs.length; i++){
        dataElementContent.push(Api.findDataElementContent(dataElementIDs[i]));
      }
      Promise.all(dataElementContent).then(function (dataObjects){
        _callback(dataObjects);
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
        if (nextName === "Approved/Rejected Current Status") {
          nextDataContent = "Pending";
        }
        else {
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
          <table className="newEntryTable">
            <tbody>
              {this.state.rows}
            </tbody>
            <div id="errorMessage" type="text"></div>
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
