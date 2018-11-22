import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class ReportList extends Component{
	render() {
		return (
      <Link to={{pathname: '/dho/reportlist/report', state: {report: this.props.report, id: this.props.id}}}>
        <ul className="ReportListItem">
          <li className="ReportListItemName"><b>Doctor name: </b>{this.props.creator}</li>
          <li className="ReportListItemDate"><b>Date: </b>{this.props.date}</li>
        </ul>
      </Link>
		);
	}
}
