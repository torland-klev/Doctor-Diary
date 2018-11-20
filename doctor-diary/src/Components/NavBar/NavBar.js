import React from 'react';
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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div className="NavBar">
        <BottomNavigation
            value={value}
            active={this.state.active}
            onChange={this.handleChange}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction 
                component={Link}
                to={this.state.homeLink}
                key="home"
                label="Home" 
                icon={<Home />} 
                onPress={() => this.setState({ active: 'home' })}
            />
            <BottomNavigationAction
                component={Link}
                to={this.state.loginpage}
                key="logout"
                label="Log out" 
                icon={<ExitToApp />} 
                onPress={() => this.setState({ active: 'logout' })}
            />
            <BottomNavigationAction 
                component={Link}
                to={this.state.declinedLink}
                key="declined"
                label="Declined" 
                icon={<ViewList />}
                onPress={() => this.setState({ active: 'declined' })}
            />
            <BottomNavigationAction
                component={Link}
                to={this.state.newLink}
                Key="addEntry"
                label="Add entry" 
                icon={<AddCircle />} 
                onPress={() => this.setState({ active: 'addEntry' })}
            />
        </BottomNavigation>
        </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
