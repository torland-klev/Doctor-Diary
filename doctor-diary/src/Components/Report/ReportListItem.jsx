import React, { Component } from "react";
import {Link} from 'react-router-dom';
import '../Components.css'
import '../../index.css'

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
        <tr>
          <td><Link to={{pathname: this.state.pathname, state: {report: this.props.report, id: this.props.id, user: this.props.user}}}>{this.props.creator}</Link></td>{/* only use creator? */}
          <td><Link to={{pathname: this.state.pathname, state: {report: this.props.report, id: this.props.id, user: this.props.user}}}> {this.props.date} </Link></td>{/** only use date? */}
        </tr>
		);
	}
}
