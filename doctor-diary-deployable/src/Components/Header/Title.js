import React, { Component } from "react";

export default class Title extends Component{
	render() {
		return (
			<div className="Title">
                {this.props.title}
			</div>
		);
	}
}