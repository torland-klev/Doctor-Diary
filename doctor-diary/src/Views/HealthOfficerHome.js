import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import OrganizationListHolder from '../Components/Report/OrganizationListHolder.jsx';

export default class HealthOfficerHome extends Component {
    constructor() {
        super();
        this.state = {
            title: "HEALTH OFFICER",
            backbutton: "Homepage",
            backbuttonlink: "/",
        }
    }
    render() {
        return (
          <OrganizationListHolder />
        )
    }
}
