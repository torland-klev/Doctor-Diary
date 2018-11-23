import React, { Component } from "react";
import DataElement from '../Report/DataElement.jsx'
import '../Components.css'

export default class ReportHolder extends Component{
	constructor(props){
		super(props);
		this.state = {
			rows: []
		};
	}

	componentWillMount(){
		this.setState({rows: []});
	}

	componentDidMount(){
		this.updateRows();
	}

	updateRows(){
		const reports = this.props.report.dataValues;
		reports.forEach((el) => {
			this.fetchElementName(el.dataElement).then((result) => {
				this.setState({rows: this.state.rows.concat([
					<DataElement dataElement={result.name} value={el.value} key={result.id}/>])
				});
			})
		})
	}

	fetchElementName(id){
		//Fetch the attributes
		const url = 'https://course.dhis2.org/dhis/api/dataElements/' + id;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
	      const el = responseJson;
				var element = {
					name: el.name,
					id: id
				};
				return element;
			})
	    .catch((error) => {
	    }
		);
	}

	render() {
		var comment = "";

    // dataValues.forEach((el) => {
		// 	if (el.dataElement === "yiAhmn4q7wJ") {
		// 		comment = el.value;
		// 	}
    //   rows.push(
    //     <DataElement
    //       dataElement={el.dataElement}
    //       value={el.value}
    //       key={el.dataElement}/>);
    // })

    /** TODO: Style the table */
		return (
      <table>
        <tbody>
          <tr>
            <th className="TableDataElement">Question</th> {/** Data element */}
            <th className="TableValue">Answer</th> {/** Value */}
          </tr>
          {this.state.rows}
        </tbody>
      </table>
		);
	}

}
