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
			prevProps: [],
			total: 0
		}
	}

	componentWillMount(){
		this.setState({prevProps: this.props.reports});
	}
	componentDidMount(){
		this.updateReports();
	}
	componentDidUpdate(){
		if (!this.state.prevProps){
			this.setState({prevProps: this.props.reports});
		}
		else if (this.arrayComparator(this.state.prevProps, this.props.reports)){
		}
		else {
			this.setState({prevProps: this.props.reports, rows: [], total: this.props.total});
			this.updateReports();
		}
	}

	arrayComparator(array1, array2){
		if(array1.length !== array2.length){
			return false;
		}
		var boolArray = [];
		for (var i = 0; i < array1.length; i++){
			if (this.arrayHas(array2, array1[i])){
				boolArray.push(1);
			}else {
				boolArray.push(0);
			}
		}
		if (this.arrayHas(boolArray, 0)){
			return false;
		} else {
			return true;
		}
	}

	arrayHas(array, element){
		for (var i = 0; i < array.length; i++){
			if (array[i] === element){
				return true;
			}
		}
		return false;
	}

	updateReports(){
		const reports = this.props.reports;
		reports.forEach((el) => {
			this.getTeiName(el.trackedEntityInstance).then((result) => {
				this.setState({total: this.state.total-1, rows: this.state.rows.concat([
					<ReportListItem user={this.props.user} report={el} id={this.props.id} creator={(result) ? result : "NO_NAME_GIVEN"} date={el.created} key={el.event}/>])
				});
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
	    }
		);
	}

	render() {
		if (this.props.reports.length){
			return ((this.state.rows.length === this.props.max) || !(this.state.total)) ? (
	      <div>
	        {this.state.rows}
	      </div>
			) : (
				<div>Loading... {this.state.rows}</div>
			)
		}
		else {
			return (
				<div> No reports in category, or failed to load </div>
			)
		}
	}
}
