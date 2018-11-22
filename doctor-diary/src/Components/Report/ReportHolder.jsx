import React, { Component } from "react";
import DataElement from '../Report/DataElement.jsx'
import '../Components.css'

export default class ReportHolder extends Component{
	render() {
    const rows = [];
    const report = this.props.report; //Change this if necessary
    const dataValues = report.dataValues;
		var comment = "";

    dataValues.forEach((el) => {
			if (el.dataElement === "yiAhmn4q7wJ") {
				comment = el.value
			}
      rows.push(
        <DataElement
          dataElement={el.dataElement}
          value={el.value}
          key={el.dataElement}/>);
    })
    
    /** TODO: Style the table */
		return (
      <table>
        <tbody>
          <tr>
            <th className="TableDataElement">Question</th> {/** Data element */}
            <th className="TableValue">Answer</th> {/** Value */}
          </tr>
          {rows}
        </tbody>
      </table>
		);
	}

}
