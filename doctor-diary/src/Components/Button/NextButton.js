import React, { Component } from "react";

export default class NextButton extends Component{
	render() {
		return (
            <a href={this.props.link} className="NextButton">{this.props.title}</a>
		);
	}
}