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
          <IconHome homeFill={this.props.homeFill} homeLink={this.props.homeLink}/>
          <IconList listFill={this.props.listFill} listLink={this.props.listLink}/>
          <IconNotification notificationFill={this.props.notificationFill} notificationLink={this.props.notificationLink}/>
          <IconAdd addFill={this.props.addFill} addLink={this.props.addLink} />
        </nav>
    );
  }
}