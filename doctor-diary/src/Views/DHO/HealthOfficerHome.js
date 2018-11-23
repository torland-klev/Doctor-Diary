import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import OrganizationListHolder from '../../Components/Report/OrganizationListHolder.jsx';

/*
 * This is the start of the District Health Officer wild ride.
 * The entire DHO adventure is like a recurisve waterfall. One component
 * will call a new component, which will call a new component. I will
 * here try to explain the program flow. I will elaborate on the specific
 * element when we come to them in the code.
 *
 * In essence, the flow goes like this:
 *
 * HealthOfficerHome -> 1 OrganizationListHolder -> 1 OrganizationList -> Many OrganizationListItems
 *
 * Each OrganizationListItem can call on HealthOfficerReportList with their own orgUnit ID.
 *
 * HealthOfficerReportList -> 1 ReportListHolder -> 1 ReportList -> Many (up to 8) ReportListItems
 *
 * Each ReportListItem can call on HealthOfficerViewReport with their own Event, which will be displayed.
 *
 * HealthOfficerViewReport -> 1 ReportHolder -> Many DataElements
 *
 * You can at any point in the process take a step back.
 *
 */

export default class HealthOfficerHome extends Component {
  constructor() {
      super();
      this.state = {
          title: "HEALTH OFFICER",
          active: '#43CBCB',
          homeLink: "/dho",
          ids: [],
          i: [],
          n: [],
          sort: 0,
          sortSymbol: "sort list"
      }
  }

  /* When the component mounts, every teiSearchOrganisationUnit ID from /api/me
   * will be fetched. Then, the name will be fetched from /api/organisationUnits/[ID].
   * The ID will be placed into the state.i, while the name will be placed into state.n
   * at the same time. The ID will then have the same array index as the corresponding
   * name.
   * The reason for the state.ids is that its a hacky way to know when the list
   * is still loading.
   */
  componentDidMount(){
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

  sortNumber(){
    var number = this.state.sort;
    if (number === 2){
      number = 0;
      this.setState({sort: 0, sortSymbol: '-'});
    } else if (number === 1){
      number = 2;
      this.setState({sort: 2, sortSymbol: '^'});
    } else {
      number = 1;
      this.setState({sort: 1, sortSymbol: 'v'})
    }
    return number;
  }

  render() {
    return (this.state.ids.length === this.state.i.length) ? (
      <div>
          <Header title={this.state.title} />
          <main>
            <h2>Choose the organisation unit</h2>
            <OrganizationListHolder user="DHO" elements={this.state.i} names={this.state.n} sort={this.state.sort}/>
            <button className="ReportPageButton" onClick={() => {this.sortNumber()}}>{this.state.sortSymbol}</button>
          </main>
      </div>
    ) : (
      <div>
          <Header title={this.state.title} />
          <main>
            <h2>Choose the organisation unit</h2>
            Loading...
          </main>
      </div>
    )
  }
}
