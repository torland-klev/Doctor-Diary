import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class OrganizationListItem extends Component{
	render() {
		return (
			<Link to={{pathname: '/dho/reportlist', state: {id: this.props.id}}}>
      	<div>{this.props.name}</div>
			</Link>
		);
	}
}
