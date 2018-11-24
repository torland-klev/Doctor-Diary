import React, { Component } from "react";
import Title from "./Title"
import HeaderImage from "./HeaderImg.js";

export default class Header extends Component {
   render () {
        return (
            <header>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
                <HeaderImage />
                <Title title={this.props.title} />
            </header>
        );
    }
}