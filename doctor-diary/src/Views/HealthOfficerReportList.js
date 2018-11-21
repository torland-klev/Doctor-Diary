import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import ReportListHolder from '../Components/Report/ReportListHolder.jsx';

export default class HealthOfficerHome extends Component {
  constructor() {
      super();
      this.state = {
          title: "HEALTH OFFICER REPORT LIST",
          backbutton: "Back",
          backbuttonlink: "/healthofficer",
          reports: []
      }
  }

  componentWillMount(){
    this.setState({reports: []});
  }

  componentDidMount(){
    this.fetchReports().then((reports) => {
      this.setState({reports: reports});
    });
  }

  fetchReports(){
    const id = this.props.location.state.id;
    const url = 'https://course.dhis2.org/dhis/api/events?paging=false&orgUnit=' + id;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
        var reports = [];
	      responseJson.events.forEach((el) => {
          reports.push(el);
				})
        return reports;
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
  }

  render() {
    return (
      <div className="Home">
          <Header title={this.state.title} />
          <main className="Home-main">
              <ReportListHolder reports={this.state.reports} id={this.props.location.state.id} total={this.state.reports.length}/>
              <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
          </main>
      </div>
    )
  }
}
