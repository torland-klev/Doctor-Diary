import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import OrganizationListHolder from '../Components/Report/OrganizationListHolder.jsx';

export default class HealthOfficerHome extends Component {
  constructor() {
      super();
      this.state = {
          title: "HEALTH OFFICER",
          backbutton: "Homepage",
          backbuttonlink: "/",
          ou: []
      }
  }

  componentDidMount(){
    this.fetchReports();
  }

  fetchReports(){
    const url = 'https://course.dhis2.org/dhis/api/me';
		return fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
	      responseJson.teiSearchOrganisationUnits.forEach((el) => {
          this.setState({ou: this.state.ou.concat([el])});
				})
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
            <OrganizationListHolder elements={this.state.ou}/>
            <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
          </main>
      </div>
    )
  }
}
