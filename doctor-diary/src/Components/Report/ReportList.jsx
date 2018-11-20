import React, { Component } from "react";
import ReportListItem from '../Report/ReportListItem.jsx';

/* Input: Array of reports/events
 * Displays: Creator and creation date of every report
 * Function: Can click on any given report to access it
 */

export default class ReportList extends Component{
	render() {
    const rows = [];
    const reports = this.props.reports; //Change this if necessary

    reports.forEach((el) => {
      rows.push(
        <ReportListItem
          report={el}
          key={el.event}/>);
    })
		return (
      <div>
        {rows}
      </div>
		);
	}
}
