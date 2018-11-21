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
          names: [],
          ids: [],
          i: [],
          n: []
      }
  }

  componentDidMount(){
    var names = [];
    this.fetchReports().then( (ou) => {
      this.setState({ids: ou});
      ou.forEach( (el) => {
        this.fetchOuName(el.id);
      })
    });
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
        var ou = [];
	      responseJson.teiSearchOrganisationUnits.forEach((el) => {
          ou.push(el);
				})
        return ou;
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
  }

  fetchOuName(id){
    const url = 'https://course.dhis2.org/dhis/api/organisationUnits/' + id;
    return fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
        this.setState({i: this.state.i.concat([id]), n: this.state.n.concat([responseJson.name])});
	      return responseJson.name;
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
  }

  render() {
    return (this.state.ids.length === this.state.i.length) ? (
      <div className="Home">
          <Header title={this.state.title} />
          <main className="Home-main">
            <h2>Choose the organisation unit</h2>
            <OrganizationListHolder elements={this.state.i} names={this.state.n}/>
            <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
          </main>
      </div>
    ) : (
      <div className="Home">
          <Header title={this.state.title} />
          <main className="Home-main">
            Loading...
            <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />
          </main>
      </div>
    )
  }
}
