import React, { Component } from "react";
import IconHome from './IconHome.js';
import IconAdd from './IconAdd';
import IconList from './IconList';
import IconNotification from './IconNotification';
import './NavBar.css'

export default class NavBar extends Component {
  render() {
    return (
        <nav>
          <IconHome homeFill={this.props.homeFill}/>
          <IconList listFill={this.props.listFill}/>
          <IconNotification notificationFill={this.props.notificationFill}/>
          <IconAdd addFill={this.props.addFill} />
        </nav>
    );
  }
}