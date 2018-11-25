import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import DataElement from '../../Components/Report/DataElement.jsx';
import DataElementForm from '../../Components/DataElementForm.js';

const baseURL = "https://course.dhis2.org/dhis/api";
var userNew = "AkselJ" //doctor
var passNew = "District1-" //hardkodet for nå
var authKey = 'Basic ' + btoa(userNew + ':' + passNew);

export default class EditEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      report: [],
      rows: [],
      rowsDataElement: [],
      tmpDataFromChild: "",
      tmpId: ""
    }
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.myCallback = this.myCallback.bind(this);
  }


  myCallback(id, dataFromChild) {
    this.setState({tmpDataFromChild: dataFromChild, tmpId: id})
  }

  componentWillMount(){
    this.updateRows();
  }

  updateRows(){
    const dataValues = this.props.location.state.report.dataValues;
    var promises = [];
    dataValues.forEach((el) => {
      promises.push(this.fetchElementName(el.dataElement, el.value));
    });
    Promise.all(promises)
    .then( (result) => {
      result.forEach( (el) => {
        this.setState({rowsDataElement: this.state.rowsDataElement.concat([
          <DataElement dataElement={el.name} value={el.value} key={el.id}/>])
        });
      })
      this.makeComponents();
    })
  }
  fetchElementName(id, value){
    //Fetch the attributes
    const url = 'https://course.dhis2.org/dhis/api/dataElements/' + id;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const el = responseJson;
        var element = {
          name: el.name,
          id: id,
          value: value
        };
        return element;
      })
      .catch((error) => {
      }
    );
  }


  updateData() {
    var report = this.state.report;
    if (this.state.tmpId && this.state.tmpDataFromChild)  {
      var newElement = true
      report.dataValues.forEach((el) => {
        if (this.state.tmpId === el.dataElement) {
          newElement = false
          el.value = this.state.tmpDataFromChild

        //  this.setState(report: this.state.report.concat([putInList]))
        }
      })
      if (newElement) {
        var value = this.state.tmpDataFromChild
        var dataElement = this.state.tmpId
        var putInList = {dataElement: dataElement, value: value}
        //this.setState(report: this.state.report.concat([putInList]));
      }
      this.setState({report: report});
      this.setState({tmpId: null});
      this.setState({tmpDataFromChild: null});
    }
  }


  makeComponents() {
    var report = this.props.location.state.report;
    report.dataValues.forEach((el) => {
      //Hvis det er statusen:
      if (el.dataElement === "zrZADVnTtMa") {
        el.value = "Pending";
      }
      else {
        for (var i=0; i<this.state.rowsDataElement.length; i++) {
          if (this.state.rowsDataElement[i].key === el.dataElement) {
            var name = this.state.rowsDataElement[i].props.dataElement
            var id = this.state.rowsDataElement[i].key
            var valueType = this.state.rowsDataElement[i].props.value
            var newDataElementForm = React.createElement(DataElementForm, {id: id, name: name, valueType: valueType, dataContent: el.value, callbackFromParent: this.myCallback}, null)
            var htmlDataElementContainer = React.createElement("div", null, newDataElementForm)
            this.state.rows.push(htmlDataElementContainer)
            break;
          }
        }
      }
    })
    this.setState({report: report});
  }


  saveToLocalStorage() {
    console.log("Ready to save: ")
    console.log(this.state.report)
    var key = "ready";
    localStorage.setItem("nameList", JSON.stringify(this.state.rowsDataElement));
    localStorage.setItem(key, JSON.stringify(this.state.report));
  }

  render(){
    this.updateData();
    return(
        <div>
            <Header title={this.state.title} />
            <main>
              <table>
                <tbody>
                    {this.state.rows}
                </tbody>
                <div id="errorMessage" type="text"></div>
              </table>
              <div className="NewButtonContainer">
                <a href='/doctor/editEntry/confirmEditedReport' onClick={this.saveToLocalStorage} className="ReportPageButton">Next</a>
                <a href='/doctor' className='ReportPageButton'>Back</a>
              </div>
            </main>
            <NavBar addFill={this.state.active}/>
        </div>
    );
  }
}
