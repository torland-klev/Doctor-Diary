import React, { Component } from "react";

export default class DataElement extends Component{
	render() {
    const dataElement = this.props.dataElement;
    const value = this.props.value;
		return (
      <tr>
        <td className="TableDataElement">{dataElement}</td>
        <td className="TableValue">{value}</td>
      </tr>
		);
	}
}
