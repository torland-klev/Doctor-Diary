import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class OrganizationListItem extends Component{
	render() {
		return (
			<Link to={{pathname: '/healthofficer/reportlist', state: {id: this.props.element.id}}}>
      	<div>{this.props.element.id}</div>
			</Link>
		);
	}
}
