import React, { Component } from "react";
import OrganizationListItem from '../Report/OrganizationListItem.jsx';

export default class OrganizationList extends Component{
	render() {
		var rows = [];
		const elements = this.props.elements;
		elements.forEach ( (el) => {
			rows.push(<OrganizationListItem element={el} key={el}/>);
		})
		return (
			<div>{rows}</div>
		);
	}
}
