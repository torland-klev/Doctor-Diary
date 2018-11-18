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
            dataElements: [{name: "Element one", valueType: "kristne verdier", id: "101"}, {name: "Element two", valueType: "okonomiske verdier", id: "007"}],
            dataToBeStored: [],
            fullDate: "",
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
        localStorage.setItem(this.state.fullDate, JSON.stringify(this.state.dataToBeStored));
    }


    componentWillMount() {
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        console.log(day);
        this.state.fullDate = day + "." + month + "."+ year;
        var elements = this.state.dataElements;
        elements.forEach((el) => {
              this.state.rows.push(<tr><p type="text" id={el.name}>{el.name}</p></tr>)
              this.state.rows.push(<tr><input type={el.valueType} name={el.name} onKeyUp={this.updateData.bind(this, el.id, el.name)} id={el.id} placeholder="..." /></tr>);
            })
    }


    updateData(id, name) {
      var theId = id;
      var dataContent = document.getElementById(theId).value;
      console.log(dataContent)

      //Maa finne ut om tabellen allerede har et element med denne id'en:
      //Altsaa ikke opprett objekt med samme id flere ganger.

      var newElement = true;
      if (this.state.dataToBeStored.includes(theId)) {
        console.log("found the id")
      }

      if (newElement == true) {
          var newElement = {id: id, name: name, dataContent: dataContent};
          this.state.dataToBeStored.push(newElement);
      }

    }


    render () {
        return(

            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                    <h1>Create report for date {this.state.fullDate}</h1>

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
