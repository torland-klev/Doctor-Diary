import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';

import DataElementForm from '../../Components/DataElementForm.js';

const baseURL = "https://course.dhis2.org/dhis/api";
var userNew = "AkselJ" //doctor
var passNew = "District1-" //hardkodet for nå
var authKey = 'Basic ' + btoa(userNew + ':' + passNew);

export default class ConfirmEditedReport extends Component {
  constructor(props){
    super(props);
    this.state = {
      report: "",
      rows: [],
      tmpDataFromChild: "",
      tmpId: "",
    }
    this.updateData = this.updateData.bind(this)
    this.myCallback = this.myCallback.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
    this.makeComponents = this.makeComponents.bind(this)
  }


  myCallback(id, dataFromChild) {
        this.setState({tmpDataFromChild: dataFromChild, tmpId: id})
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
    var rep = localStorage.getItem("ready")
    var rep2 = JSON.parse(rep)
    this.state.report = rep2;
    console.log(this.state.report)
    this.makeComponents();
  }


  makeComponents() {
    var rep = this.state.report.dataValues
    rep.forEach((el) => {
      //Hvis det er statusen:
      if (!(el.dataElement === "zrZADVnTtMa")) {
        this.state.rows.push(<tr><p type="text" id={el.name}>{el.name}</p></tr>)
        this.state.rows.push(<tr><p type="text" id={el.value}>{el.value}</p></tr>)
        console.log(el.name)
        console.log(el.value)
        console.log(el.dataElement)
      }
    })
  }

  render(){
    this.updateData();
    console.log(this.state.report.dueDate);
    return(
        <div>

            <main>
            <h1>Report</h1>
            <table>
                <tbody>
                    {this.state.rows}
                </tbody>
            </table>

            </main>
            <NavBar addFill={this.state.active}/>
        </div>
    );
  }
}
