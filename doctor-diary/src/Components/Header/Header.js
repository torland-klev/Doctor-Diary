import React, { Component } from "react";
import "../Components.css";
import Title from "./Title"
import HeaderImage from "./HeaderImg.js";

export default class Header extends Component {
   render () {
        return (
            <div className="Header">
                <HeaderImage />
                <Title title={this.props.title} />
            </div>
        );
    }
}