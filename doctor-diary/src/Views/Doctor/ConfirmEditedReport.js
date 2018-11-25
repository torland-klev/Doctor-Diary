import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import Api from '../../Api.js';

import DataElementForm from '../../Components/DataElementForm.js';

export default class ConfirmEditedReport extends Component {
  constructor(props){
    super(props);
    this.state = {
      report: [],
      nameList: [],
      rows: [],
      tmpDataFromChild: "",
      tmpId: "",
      sent: false,
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

  sendToAPI(report) {
    this.setState({sent: true});
    Api.UpdateDataToApi(report);
  }

  componentWillMount(){
    var rep = localStorage.getItem("ready")
    var report = JSON.parse(rep)
    this.state.report = report
    var nameList = JSON.parse(localStorage.getItem("nameList"))
    this.state.nameList = nameList
    console.log("this.state.report: ")
    console.log(this.state.report)
    console.log("this.state.nameList: ")
    console.log(this.state.nameList)
    this.makeComponents();
  }


  makeComponents() {
    console.log("THIS REPORT: ")
    console.log(this.state.report)
    for (var i=0; i<this.state.report.dataValues.length; i++) {
      console.log("this.state.report[i].dataElement")
      console.log(this.state.report.dataValues[i].dataElement)
      if (!(this.state.report.dataValues[i].dataElement === "zrZADVnTtMa")) {
        for (var j=0; j<this.state.nameList.length; j++) {
          if (this.state.nameList[i].key === this.state.report.dataValues[i].dataElement) {
              this.state.rows.push(<tr><p type="text" id={this.state.nameList[i].props.dataElement}>{this.state.nameList[i].props.dataElement}</p></tr>)
              this.state.rows.push(<tr><p type="text" id={this.state.report.dataValues[i].value}>{this.state.report.dataValues[i].value}</p></tr>)
              break;
          }
        }
      }
    }
    localStorage.removeItem("ready")
    localStorage.removeItem("nameList")
  }


  render(){
    this.updateData();
    return (this.state.sent) ? (
      <div>
        <Header title={this.state.title} />
        <main>
          <h2>Report successfully edited</h2>
          <a href='/' className='ReportPageButton'>Home</a>
        </main>
      </div>) :(
        <div>

            <main>
            <h1>New report for date {this.state.report.dueDate.substring(0, 10)}</h1>
            <table>
                <tbody>
                    {this.state.rows}
                </tbody>
            </table>
            <button onClick={() => this.sendToAPI(this.state.report)}>Send</button>
            </main>
            <NavBar addFill={this.state.active}/>
        </div>
    );
  }
}
