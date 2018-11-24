import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import NavBar from '../../Components/NavBar/NavBar.js';
import MainReportList from '../../Components/Report/MainReportList.js';
import {Link} from 'react-router-dom';


export default class HealthOfficerReportList extends Component {
  constructor (){
    super();
    this.state = {
        title: "DHO Report List",
        homeLink: '/doctor',
        backbutton: 'Back',
        active: '#43CBCB'

    }
}
  render(){
    return (
      <div className="Home">
          <Header title={this.state.title}/>
          <h1> Reports for </h1>
          <main className="Home-main">
              {this.props.location.state.name}
              <MainReportList id={this.props.location.state.id} user="DHO" />
              <Link to={{pathname: '/dho'}}>
                      <div className="ReportPageButton">{this.state.backbutton}</div>
              </Link>
          </main>
          <NavBar homeFill={this.state.active}/>
      </div>
    )
  }
}
