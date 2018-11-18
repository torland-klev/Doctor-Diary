import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class ReportList extends Component{
	render() {
    const report = this.props.report;
    const creator = report.trackedEntityInstance;
    const date = report.created;
		return (
      <Link to={{pathname: '/healthofficer/report', state: {report: this.props.report}}}>
        <div className="ReportListItem">
          <div className="ReportListItemName"><b>Doctor name:</b> {creator}</div>
          <div className="ReportListItemDate"><b>Date:</b> {date}</div>
        </div>
      </Link>
		);
	}
}
