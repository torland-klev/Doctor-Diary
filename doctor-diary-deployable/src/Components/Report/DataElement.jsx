import React, { Component } from "react";

export default class DataElement extends Component{
	render() {
    const dataElement = this.props.dataElement;
    const value = this.props.value;
		return (
      <tr>
        <td>{dataElement}</td>
        <td>{value}</td>
      </tr>
		);
	}
}
