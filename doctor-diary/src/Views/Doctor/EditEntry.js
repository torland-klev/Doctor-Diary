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
      report: "",
      rows: [],
      rowsDataElement: [],
      tmpDataFromChild: "",
      tmpId: "",
    }
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
    this.makeComponents = this.makeComponents.bind(this)
    this.updateData = this.updateData.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.myCallback = this.myCallback.bind(this)
  }


  myCallback(id, dataFromChild) {
    this.setState({tmpDataFromChild: dataFromChild, tmpId: id})
  }


  fetchElementName(id){
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
          id: id
        };
        return element;
      })
      .catch((error) => {
      }
    );
  }


  updateRows(){
    const report = this.state.report.dataValues
    report.forEach((el) => {
      this.fetchElementName(el.dataElement).then((result) => {
        this.setState({rowsDataElement: this.state.rowsDataElement.concat([
          <DataElement dataElement={result.name} value={el.value} key={result.id}/>])
        });
      })
    })
  }


  updateData() {
    if (this.state.tmpId != null && this.state.tmpDataFromChild != null) {
        this.state.report.dataValues.forEach((el) => {
          if (el.dataElement.id === this.state.tmpId) {
            el.value = this.state.tmpDataFromChild
          }
        })
    }
    this.state.tmpDataFromChild = null
    this.state.tmpId = null
}


  componentWillMount(){
    //this.setState({report: this.props.location.state.report});
    this.state.report = this.props.location.state.report
    this.makeComponents()
    this.updateRows()
  }


  makeComponents() {
    console.log(this.state.rowsDataElement)
    console.log(this.state.report)
    this.state.report.dataValues.forEach((el) => {
      //Hvis det er statusen:
      if (el.dataElement === "zrZADVnTtMa") {
        el.value = "Pending";
      }
      else {
        for (var i=0; i<this.state.rowsDataElement.length; i++) {
          if (this.state.rowsDataElement[i].id === el.DataElement) {
            var name = this.state.rowsDataElement[i].name
            var id = this.state.rowsDataElement[i].id
            var valueType = this.state.rowsDataElement[i].valueType
            var newDataElementForm = React.createElement(DataElementForm, {id: id, name: name, valueType: valueType, dataContent: el.value, callbackFromParent: this.myCallback}, null)
            var htmlDataElementContainer = React.createElement("div", null, newDataElementForm)
            this.state.rows.push(htmlDataElementContainer)
          }
        }
      }
    })
  }


  saveToLocalStorage() {
    var v = this.state.report
    var value = JSON.stringify(v)
    var key = "ready"
    localStorage.setItem(key, value);
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
                <a href='/doctor/editEntry/confirmEditedReport' onClick={this.saveToLocalStorage} className="Home-button">Next</a>
                <a href='/doctor' className='Home-button'>Back</a>
            </table>


            </main>
            <NavBar addFill={this.state.active}/>
        </div>
    );
  }
}
