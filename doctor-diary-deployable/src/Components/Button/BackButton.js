import React, { Component } from "react";

export default class BackButton extends Component{
	render() {
		return (
            <a href={this.props.link} className="BackButton">{this.props.title}</a>
		);
	}
}