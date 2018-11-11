import React, { Component } from "react";

export default class BackButton extends Component{
	render() {
		return (
			<div className="BackButton">
                <a href={this.props.link}>{this.props.title}</a>
            </div>
		);
	}
}