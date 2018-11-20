import React, { Component } from "react";
import ReportListItem from '../Report/ReportListItem.jsx';

/* Input: Array of reports/events
 * Displays: Creator and creation date of every report
 * Function: Can click on any given report to access it
 */

const FIRST_NAME_ID = "w75KJ2mc4zz";
const LAST_NAME_ID = "zDhUuAYrxNC";

export default class ReportList extends Component{
	constructor(props){
		super(props);
		this.state = {
			rows: [],
			reports: []
		}
	}

	componentDidMount(){
		this.updateReports();
	}
	componentDidUpdate(){
		if (this.state.reports === this.props.reports{
			console.log("Reports equal");
		}
	}

	updateReports(){
		const reports = this.props.reports;
		reports.forEach((el) => {
			this.getTeiName(el.trackedEntityInstance).then((result) => {
				this.setState({rows: this.state.rows.concat([
					<ReportListItem report={el} creator={(result) ? result : "NO_NAME_GIVEN"} date={el.created} key={el.event}/>]
					), reports: this.state.reports.concat([el])});
			})
		})
	}

	getTeiName(id){
		var firstname = '';
		var lastname = '';
		//Fetch the attributes
		const url = 'https://course.dhis2.org/dhis/api/trackedEntityInstances/' + id;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
	      responseJson.attributes.forEach((el) => {
					if (el.attribute === FIRST_NAME_ID){
						firstname = el.value;
					}
					else if (el.attribute === LAST_NAME_ID) {
						lastname = el.value;
					}
				})
				return (firstname + " " + lastname);
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
	}

	render() {
		return (this.state.rows.length === this.props.perPage) ? (
      <div>
        {this.state.rows}
      </div>
		) : (
			<div>Loading... {this.state.rows}</div>
		)
	}
}
