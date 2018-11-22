import React, { Component } from "react";
import OrganizationList from '../Report/OrganizationList.jsx';

export default class OrganizationListHolder extends Component{
	render() {
		return (
      <OrganizationList elements={this.props.elements} sort={this.props.sort} names={this.props.names}/>
		);
	}
}