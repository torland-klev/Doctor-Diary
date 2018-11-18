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
        var d = new Date();
        var year = String(d.getFullYear());
        var month = String(d.getMonth());
        var day = String(d.getDate());
        console.log(day);
        this.state.fullDate = day + month + year;
        console.log("saveToLocalStorage " + this.state.fullDate);
        //Husk aa endre paa det som settes inn i local storage
        localStorage.setItem(this.state.fullDate, JSON.stringify(this.dataToBeStored));
    }


    componentWillMount() {
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
      var newElement = {id:{id}, name:{name}, data:{dataContent}};
      this.state.dataToBeStored.push(newElement);
      console.log(this.state.dataToBeStored)
    }


    render () {
        return(

            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                    <h1>Create Report for date {this.state.fullDate}</h1>

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
