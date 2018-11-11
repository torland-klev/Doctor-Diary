import React, { Component } from "react";

export default class BackButton extends Component{
	render() {
		return (
            <a href={this.props.link} className="Button">{this.props.title}</a>
		);
	}
}