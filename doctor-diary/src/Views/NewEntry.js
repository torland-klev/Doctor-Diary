import React, { Component } from 'react';


export default class NewEntry extends Component {
    state = {

    }
    render () {
        return(
            <div className="Home">
                <header className="Home-header">
                <label name="entrydesctription">No of Emergency Cesearean Cases provided anaesthesia during night time (5PM - Morning)</label>
                <input type="text" name="nyttelement" id="nyttelement"
                       placeholder="New element" />


            </header>
            </div>
        )
    }
}
