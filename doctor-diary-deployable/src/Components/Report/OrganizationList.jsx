import React, { Component } from "react";
import OrganizationListItem from '../Report/OrganizationListItem.jsx';
import '../Components.css'

export default class OrganizationList extends Component{

	sortDescArray(array){
		var stop = false;
		while(!stop){
			if (this.isDescSorted(array)){
				stop = true;
				break;
			}
			for (var i = 0; i < array.length-1;i++){
				if(array[i].props.name > array[i+1].props.name){
					var temp = array[i];
					array[i] = array[i+1];
					array[i+1] = temp;
				}
			}
			this.sortDescArray(array);
		}
		return true;
	}

	sortAscArray(array){
		var stop = false;
		while(!stop){
			if (this.isAscSorted(array)){
				stop = true;
				break;
			}
			for (var i = 0; i < array.length-1;i++){
				if(array[i].props.name < array[i+1].props.name){
					var temp = array[i];
					array[i] = array[i+1];
					array[i+1] = temp;
				}
			}
			this.sortAscArray(array);
		}
		return true;
	}

	isDescSorted(array){
		for (var i = 0; i < array.length-1; i++){
			if(array[i].props.name < array[i+1].props.name){
				continue;
			}
			return false;
		}
		return true;
	}
	isAscSorted(array){
		for (var i = 0; i < array.length-1; i++){
			if(array[i].props.name > array[i+1].props.name){
				continue;
			}
			return false;
		}
		return true;
	}

	render() {
		var rows = [];
		const names = this.props.names;
		var i = 0;
		const ids = this.props.elements;
		ids.forEach ( (id) => {
			rows.push(<OrganizationListItem name={names[i]} id={id} key={id}/>);
			i += 1;
		})
		if (rows[names.length-1]){
			if(this.props.sort === 1){
				this.sortDescArray(rows);
			} else if (this.props.sort === 2) {
				this.sortAscArray(rows);
			}
		}
		return (
			<div className="OrganizationList">{rows}</div>
		);
	}
}
