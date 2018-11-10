import React, { Component } from "react";
import "./Header.css";

/*
 * Header burde ta en "prop" verdi, som tittelen for siden 
 * slik at når den blir kallt så blir headeren 
 */

export default class Header extends Component {
   render () {
        return (
            <div className="Header">DOCTOR DIARY</div>
        )
    }
}