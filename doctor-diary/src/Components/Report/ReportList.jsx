import React, { Component } from "react";
import ReportListItem from '../Report/ReportListItem.jsx';
import '../Components.css';
import '../../index.css';
import Api from '../../Api.js';

/* Input: Array of reports/events
 * Displays: Creator and creation date of every report
 * Function: Can click on any given report to access it
 */

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
			Api.getTeiName(el.trackedEntityInstance).then((result) => {
				this.setState({total: this.state.total-1, rows: this.state.rows.concat([
					<ReportListItem user={this.props.user} report={el} id={this.props.id} creator={(result) ? result : "NO_NAME_GIVEN"} date={el.created} key={el.event}/>])
				});
			})
		})
	}

	render() {
		if (this.props.reports.length){
			return ((this.state.rows.length === this.props.max) || !(this.state.total)) ? (
				<table>{/** TODO fix the styling of this table -it borked */}
					<tbody>
						<tr>
							<th>Doctor:</th>
							<th>Date:</th>
						</tr>
						{this.state.rows}
					</tbody>
				</table>
			) : (
				<div className="CenterText">Loading...
					<table>{/** TODO fix the styling of this table -it borked */}
						<tbody>
							<tr>
								<th>Doctor:</th>
								<th>Date:</th>
							</tr>
							{this.state.rows}
						</tbody>
					</table>
				</div>
			)
		}
		else {
			return (
				<div className="CenterText"> No reports in category, or failed to load </div>
			)
		}
	}
}
