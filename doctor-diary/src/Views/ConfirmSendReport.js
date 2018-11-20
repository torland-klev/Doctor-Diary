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
            report: {},
            rows: [],
            fullDate: "",
        };
        this.componentWillMount = this.componentWillMount.bind(this)
    }



    componentWillMount() {
        var d = new Date();
        var year = String(d.getFullYear())
        var month = String(d.getMonth())
        var day = String(d.getDate())
        this.state.fullDate = day + "." + month + "." + year
        var obj = localStorage.getItem(this.state.fullDate)
        var parsedReport = JSON.parse(obj)
        parsedReport.forEach((el) => {
              console.log(el.id)
              console.log(el.name)
              console.log(el.dataContent)
              var str = JSON.stringify(el.name)
              this.state.rows.push(<tr><p type="text" id={el.name}>{str.substring(1, str.length - 1)}</p></tr>)
              this.state.rows.push(<tr><p type="text" id={el.dataContent}>{el.dataContent}</p></tr>);
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

                <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

                </main>
            </div>
          )
    }


    
}
