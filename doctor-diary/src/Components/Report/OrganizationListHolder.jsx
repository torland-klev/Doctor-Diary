import React, { Component } from "react";
import OrganizationList from '../Report/OrganizationList.jsx';
import '../Components.css'

export default class OrganizationListHolder extends Component{
	render() {
		return (
			<div className="OrganizationListHolder">
      		<OrganizationList elements={this.props.elements} sort={this.props.sort} names={this.props.names}/>
			</div>
		);
	}
}
