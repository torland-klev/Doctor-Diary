import React, { Component } from "react";
import DataElement from '../Report/DataElement.jsx';
import '../Components.css';
import '../../index.css';
import Api from '../../Api.js';

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
			Api.fetchElementName(el.dataElement).then((result) => {
				this.setState({rows: this.state.rows.concat([
					<DataElement dataElement={result.name} value={el.value} key={result.id}/>])
				});
			})
		})
	}

	render() {
    /** TODO: Style the table */
		return (
			<div>
      <table>
        <tbody>
          <tr>
            <th>Question</th>{/** Data element */}
            <th>Answer</th>{/** Value */}
          </tr>
          {this.state.rows}
        </tbody>
      </table>
			</div>
		);
	}

}
