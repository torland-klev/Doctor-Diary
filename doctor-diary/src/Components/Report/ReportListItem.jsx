import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class ReportList extends Component{
	constructor(props){
		super(props);
		this.state = {
			pathname: ""
		}
	}

	componentDidMount(){
		const user = this.props.user;
		if (user === "DOCTOR"){
			this.setState({pathname: '/doctor/report'});
		} else {
			this.setState({pathname: '/dho/reportlist/report'});
		}
	}
	render() {
		return (
      <Link to={{pathname: this.state.pathname, state: {report: this.props.report, id: this.props.id}}}>
        <ul className="ReportListItem">
          <li className="ReportListItemName"><b>Doctor name: </b>{this.props.creator}</li> {/* only use creator? */}
          <li className="ReportListItemDate"><b>Date: </b>{this.props.date}</li>  {/** only use date? */}
        </ul>
      </Link>
		);
	}
}
