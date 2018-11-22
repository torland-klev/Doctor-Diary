import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';

export default class ConfirmFeedback extends Component {

    render () {
        console.log("her er jeg")
        return (
              <div className="Home">
              <Header title={this.state.title} />
              <main className="Home-main">

              <h1>Hei</h1>


              </main>
          </div>
        );
    }


}
