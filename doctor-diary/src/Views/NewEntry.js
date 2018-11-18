/* Take in data from user, and saves it to local storage when "next"-button is pressed.
The next-button also redirects to next page that will contain an overview over the report and
a "send"-button that will send the data to the API.
NB: It uses date as key, so it assumes that only one doctor will be using the browser. */

import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import NextButton from '../Components/Button/NextButton.js';

export default class NewEntry extends Component {


  constructor(props) {
      super(props);
      this.state = {
            dataElements: [{name: "hei", valueType: "paa", id: "deg"}, {name: "hei", valueType: "paa", id: "deg"}],
            dataToBeStored: {},
            rows: [],
            title: "NEW ENTRY",
            backbutton: "Back to doctor",
            backbuttonlink: "/doctor",
            nextButton: "New",
            nextButtonLink: '/doctor/newEntry/confirmSendReport',
      };
      this.updateData = this.updateData.bind(this)
      this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
  }


    saveToLocalStorage() {
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        var fullDate = day + month + year;
        console.log("saveToLocalStorage " + fullDate);
        localStorage.setItem(this.state.dataToBeStored.fullDate, JSON.stringify(this.state.dataToBeStored));
    }


    componentWillMount() {
        var elements = this.state.dataElements;
        elements.forEach((el) => {
              //Husk aa lage dynamiske navn paa ting:
              this.state.rows.push(<tr><input type="text" name="el.name" onKeyUp={this.updateData} id="elementTwo" placeholder="..." /></tr>);
            })
    }


    updateData() {
      console.log("updateData")
    }


    render () {
        return(

            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                    <h1>Create Report</h1>

                    <table>
                        <tbody>
                            {this.state.rows}
                        </tbody>
                     </table>

                    <a href='/doctor/newEntry/confirmSendReport' onClick={this.saveToLocalStorage} className="Home-button">Next</a>
                    <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

                </main>

            </div>

        );
    }
}
