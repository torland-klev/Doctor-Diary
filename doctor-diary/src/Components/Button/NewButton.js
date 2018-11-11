import React, { Component } from "react";

export default class NewButton extends Component{
	render() {
		return (
            <a href={this.props.link} className="NewButton">{this.props.title}</a>
		);
	}
}