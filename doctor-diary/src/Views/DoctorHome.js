import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import ViewList from '@material-ui/icons/ViewList';
import AssignmentLate from '@material-ui/icons/AssignmentLate'
import AddCircle from '@material-ui/icons/AddCircle';

export default class DoctorHome extends Component {
    constructor (){
        super();
        this.state = {
            title: "DOCTOR",
            backbutton: "Go to homepage",
            backLink: "/",
            pendingButton: "Pending",
            pendingLink: "doctor/pending",
            declinedButton: "Declined",
            declinedLink: "doctor/declined",
            newButton: "New entry",
            newLink: "doctor/newEntry",
            homeLink: '/doctor'

        }
    }
    render () {
        return (
            <div className="Home">
                <Header title={this.state.title}/>
                <main className="Home-main">
                    <div className="Home-iconcontainer">
                        <a href={this.state.pendingLink}>
                            <ViewList style={{ fontSize:100 }} />
                            <p>{this.state.pendingButton}</p>
                        </a>
                        <a href={this.state.declinedLink}>
                            <AssignmentLate color="error" style={{ fontSize:100 }} />
                            <p>{this.state.declinedButton}</p>
                        </a>
                    </div>
                    <div className="Home-iconcontainer">
                        <a href={this.state.newLink}>
                            <AddCircle style={{ fontSize:100 }} />
                            <p>{this.state.newButton}</p>
                        </a>
                    </div>
                </main>
            </div>
          )
    }
}
