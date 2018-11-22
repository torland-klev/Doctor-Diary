import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';


export default class ConfirmSendReport extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: "Confirm Report",
            backbutton: "Back to new Entry",
            backbuttonlink: '/doctor/newEntry',
            report: "meow",
            rows: [],
            fullDate: "",
        };
        this.componentWillMount = this.componentWillMount.bind(this)
        this.sendData = this.sendData.bind(this)
    }


    componentWillMount() {
        var d = new Date();
        var year = String(d.getFullYear())
        var month = String(d.getMonth())
        var day = String(d.getDate())
        this.state.fullDate = day + "." + month + "." + year
        var obj = localStorage.getItem(this.state.fullDate)
        var parsedReport = JSON.parse(obj)
        console.log("parsedReport: " + parsedReport)
        parsedReport.forEach((el) => {
              this.state.rows.push(<tr><p type="text" id={el.name}>{el.name}</p></tr>)
              this.state.rows.push(<tr><p type="text" id={el.dataContent}>{el.dataContent}</p></tr>);
                
        })

        this.setState({report: parsedReport})
        
    }

    sendData(){

        //console.log(this.state.report);
        var objects = this.state.report;

        var values = [];

        objects.forEach((obj) => {
            
            var valueElement = {
                dataElement: obj.id,
                value: obj.dataContent
            };

            values.push(valueElement);
        })

        

        values = [
            { dataElement: "CXL5mg5l0cv", value: 10 },
            { dataElement: "EZstOIjb7wN", value: "0"}, 
            { dataElement: "romAEndBlt4", value: "0"},
            { dataElement: "p5D5Y9x7yMc", value: "0"},
            { dataElement: "LoY92GDoDC6", value: "0"},
            { dataElement: "BIB2zYDYIJp", value: 10 },
            { dataElement: "zrZADVnTtMa", value: "Approved/Rejected Current Status"}
          ]
          console.log(values);
        const newEvent = {
            program: "r6qGL4AmFV4",
            trackedEntityInstance: "vjVNrMa4zvc",
            programStage: "ZJ9TrNgrtfb",
            orgUnit: "eLLMnNjuluX",
            dataValues: values
        };

        //this.sendDataToApi(newEvent);

        /*
        const newEvent = {
            program: "r6qGL4AmFV4",
            trackedEntityInstance: "vjVNrMa4zvc",
            programStage: "ZJ9TrNgrtfb",
            orgUnit: "eLLMnNjuluX",
            dataValues: [
              { dataElement: "CXL5mg5l0cv", value: 10 },
              { dataElement: "EZstOIjb7wN", value: "10"}, 
              { dataElement: "romAEndBlt4", value: "10"},
              { dataElement: "p5D5Y9x7yMc", value: "10"},
              { dataElement: "LoY92GDoDC6", value: "10"},
              { dataElement: "BIB2zYDYIJp", value: 10 },
              { dataElement: "zrZADVnTtMa", value: "Approved/Rejected Current Status"}
            ]
        };
        */

    }

    sendDataToApi(eventElement){
        
        var authKey = 'Basic ' + btoa("AkselJ" + ':' + "District1-");

        fetch("https://course.dhis2.org/dhis/api/events", {
          method: 'POST',
          //credentials: 'include', //skal være med på deploy
          mode: 'cors',
          headers: {
            'Authorization': authKey, //FJERNES VED DEPLOY
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(eventElement)
        }).then(function(response) {
          
          //console.log(response);
          return response.json();
        }).then(function(data) {
          
          console.log(data);
        })
      }


    render () {
        return (

            <div className="Home">
                <Header title={this.state.title} />
                <main className="Home-main">

                <h1>Report for date {this.state.fullDate}</h1>

                <table>
                    <tbody>
                        {this.state.rows}
                    </tbody>
                 </table>

                <button onClick={this.sendData}>test send</button>
                <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

                </main>
            </div>
          )
    }



}
