import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import DataElement from '../../Components/Report/DataElement.jsx';
import DataElementForm from '../../Components/DataElementForm.js';
import Api from '../../Api.js';

/**
This is the view where the doctor can edit a report that has been rejected
by the DHO.
It opens the rejected report in edit mode, meaning the dataValues appears
in DataElementForms which populates the input-fields with the data from
the report. The doctor can see the comment from the dho, and comment back
if he needs to.
When the next-button is clicked, the edited report gets put to localStorage,
and the user is routed to ConfirmEditedReport.
**/

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
      promises.push(Api.fetchElementName(el.dataElement, el.value));
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


  updateData() {
    var report = this.state.report;
    if (this.state.tmpId && this.state.tmpDataFromChild)  {
      var newElement = true
      report.dataValues.forEach((el) => {
        if (this.state.tmpId === el.dataElement) {
          newElement = false
          el.value = this.state.tmpDataFromChild
        }
      })
      if (newElement) {
        var value = this.state.tmpDataFromChild
        var dataElement = this.state.tmpId
        var putInList = {dataElement: dataElement, value: value}
      }
      this.setState({report: report});
      this.setState({tmpId: null});
      this.setState({tmpDataFromChild: null});
    }
  }


  makeComponents() {
    var report = this.props.location.state.report;
    report.dataValues.forEach((el) => {
      //Automatically sets status to pending:
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
          <h1>Report for date {(String(this.state.report.dueDate)).substring(0, 10)}</h1>
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
