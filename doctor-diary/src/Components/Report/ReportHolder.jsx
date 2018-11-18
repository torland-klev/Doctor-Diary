import React, { Component } from "react";
import DataElement from '../Report/DataElement.jsx'

export default class ReportHolder extends Component{
	render() {
    const rows = [];
    const report = this.props.report; //Change this if necessary
    const dataValues = report.dataValues;

    dataValues.forEach((el) => {
      rows.push(
        <DataElement
          dataElement={el.dataElement}
          value={el.value}
          key={el.dataElement}/>);
    })

		return (
      <table>
        <tbody>
          <tr>
            <th className="TableDataElement">Data Element</th>
            <th className="TableValue">Value</th>
          </tr>
          {rows}
        </tbody>
      </table>
		);
	}
}