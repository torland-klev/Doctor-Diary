import React, { Component } from "react";
import icon from './DHIS2_icon.svg'

export default class HeaderImage extends Component {
   render () {
        return (
            <div className="HeaderImg">
                <a href="/"><img src={icon} alt="Home"  /></a>
            </div>
            
        );
    }
}