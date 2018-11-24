import React, { Component } from "react";
import {Link} from 'react-router-dom';
import '../Components.css'

export default class OrganizationListItem extends Component{
	render() {
		return (
			<Link to={{pathname: '/dho/reportlist', state: {id: this.props.id, name: this.props.name}}}>
      			<div className="OrganizationListItem">{this.props.name}</div>
			</Link>
		);
	}
}
