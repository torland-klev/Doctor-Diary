import React, { Component } from "react";
import "../Components.css";
import Title from "./Title"

/*
 * Header burde ta en "prop" verdi, som tittelen for siden 
 * slik at når den blir kallt så blir headeren 
 */

export default class Header extends Component {
   render () {
        return (
            <div className="Header">
                <Title title={this.props.title} />
            </div>
        );
    }
}