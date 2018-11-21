import React, { Component } from "react";
import OrganizationListItem from '../Report/OrganizationListItem.jsx';

export default class OrganizationList extends Component{
	render() {
		var rows = [];
		const names = this.props.names;
		var i = 0;
		const ids = this.props.elements;
		ids.forEach ( (id) => {
			rows.push(<OrganizationListItem name={names[i]} id={id} key={id}/>);
			i += 1;
		})
		return (
			<div>{rows}</div>
		);
	}
}
