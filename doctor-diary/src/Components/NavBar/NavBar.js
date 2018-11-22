import React from 'react';
import IconHome from './IconHome.js';
import IconAdd from './IconAdd';
import IconList from './IconList';
import IconNotification from './IconNotification';
import './NavBar.css'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Home from '@material-ui/icons/Home';
import ViewList from '@material-ui/icons/ViewList';
import AddCircle from '@material-ui/icons/AddCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    width: 400,
  },
};

class NavBar extends React.Component {
  state = {
    value: 0,
    homeLink: "/doctor",
    declinedLink: "/doctor/declined",
    newLink: "/doctor/newEntry",
    loginpage: "/",
  };

  render() {
    return (
        <nav className="NavBar">
          <IconHome />
          <IconList />
          <IconNotification />
          <IconAdd />
        </nav>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
