import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';

import DataElementForm from '../../Components/DataElementForm.js';

const baseURL = "https://course.dhis2.org/dhis/api";
var userNew = "AkselJ" //doctor
var passNew = "District1-" //hardkodet for nå
var authKey = 'Basic ' + btoa(userNew + ':' + passNew);

export default class EditEntry extends Component {
  constructor(props){
    super(props);
    this.state = {
      report: ""
    }
  }

  componentWillMount(){
    this.setState({report: this.props.location.state.report});
  }

  render(){
    console.log(this.state.report.dueDate);
    return(
        <div>
            <Header title={this.state.title} />
            <main>
            </main>
            <NavBar addFill={this.state.active}/>
        </div>
    );
  }
}
