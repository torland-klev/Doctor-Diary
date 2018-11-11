import React, { Component } from "react";
import "../Components.css";
import Title from "./Title"

export default class Header extends Component {
   render () {
        return (
            <div className="Header">
                <Title title={this.props.title} />
            </div>
        );
    }
}