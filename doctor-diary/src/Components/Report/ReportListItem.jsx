import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class ReportList extends Component{
	render() {
		return (
      <Link to={{pathname: '/healthofficer/report', state: {report: this.props.report}}}>
        <div className="ReportListItem">
          <div className="ReportListItemName"><b>Doctor name:</b>{this.props.creator}</div>
          <div className="ReportListItemDate"><b>Date:</b>{this.props.date}</div>
        </div>
      </Link>
		);
	}
}
