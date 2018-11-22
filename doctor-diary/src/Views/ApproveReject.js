import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import BackButton from '../Components/Button/BackButton.js';
import ReportHolder from '../Components/Report/ReportHolder.jsx'
import DropdownMenu from '../Components/DropdownMenu.js'

export default class ApproveReject extends Component {


  constructor(props) {
      super(props);
      this.state = {
          rows: [],
          newComment: "",
          oldComment: "",
          status: "",
      };
      this.updateComment = this.updateComment.bind(this)
      this.sendToAPi = this.sendToApi.bind(this)
      this.setStatus = this.setStatus.bind(this)
  }


  updateComment() {
      var newComment = document.getElementById("newComment").value
      this.setState({newComment: newComment});
  }


  setStatus(status) {
      this.setState({status: status});
  }


  sendToApi() {
      var report = testEventSmall
      console.log(report)
      var dataValues = report.dataValues
      dataValues.forEach((el) => {
          //Setting new comment:
          if (el.dataElement === "yiAhmn4q7wJ") {
            this.setState({oldComment: el.value})
            var d = new Date();
            var date = String(d.getDate()) + "." + String(d.getMonth()) + "."+ String(d.getFullYear());
            this.setState({newComment: this.state.oldComment + " *** Comment added by disctrict health officer on " + date + ":  " + this.state.newComment});
            el.value = this.state.newComment
          }
          //Setting status (accepted/rejected):
          if (el.dataElement === "zrZADVnTtMa") {
            el.value = this.state.status
          }
          //Sending the updated report back to api:
      })
      console.log(report)
  }



render() {
      return (

          <div className="Home">
              <Header title={this.state.title} />
              <main className="Home-main">
              <h1>Report for {testEventSmall.dueDate.substring(0, 10)}</h1>
              <h1>Created by {testEventSmall.storedBy}</h1>

              <ReportHolder report={testEventSmall} id="reportHolder"/>

               <input type="text" onKeyUp={this.updateComment} id="newComment" placeholder="...Your comment here..." />

               <DropdownMenu id="dropdownMenu" setStatus={this.setStatus}/>

               <a href='/confirmFeedback' onClick={this.sendToAPi} className="Home-button">Sumbit answer</a>
               <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

              </main>
          </div>
        )
  }




}


  const testEventSmall =
  {
  storedBy: "admin",
  dueDate: "2018-11-18T13:50:15.778",
  program: "r6qGL4AmFV4",
  href: "https://course.dhis2.org/dhis/api/events/hcWILsHM55W",
  event: "hcWILsHM55W",
  programStage: "grIfo3oOf4Y",
  orgUnit: "xa4F6gesVJm",
  trackedEntityInstance: "iQqWx7yPOEM",
  enrollment: "g9eVGujGCEa",
  enrollmentStatus: "ACTIVE",
  status: "ACTIVE",
  orgUnitName: "York CHC",
  attributeCategoryOptions: "xYerKDKCefk",
  lastUpdated: "2018-11-18T13:50:15.779",
  created: "2018-11-18T13:50:15.778",
  followup: false,
  deleted: false,
  attributeOptionCombo: "HllvX50cXC0",
  dataValues: [
  {
    lastUpdated: "2018-11-18T13:50:15.783",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.783",
    dataElement: "yiAhmn4q7wJ",
    value: "This is a comment",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.783",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.783",
    dataElement: "zrZADVnTtMa",
    value: "Approved/Rejected Current Status",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.783",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.783",
    dataElement: "BIB2zYDYIJp",
    value: "10",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.783",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.783",
    dataElement: "LoY92GDoDC6",
    value: "Remarks/ Feedback/ Details of Challenges faced",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.783",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.783",
    dataElement: "p5D5Y9x7yMc",
    value: "Challenges faced other",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.783",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.783",
    dataElement: "romAEndBlt4",
    value: "Challenges faced",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.782",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.782",
    dataElement: "EZstOIjb7wN",
    value: "10",
    providedElsewhere: false
    },
    {
    lastUpdated: "2018-11-18T13:50:15.782",
    storedBy: "admin",
    created: "2018-11-18T13:50:15.782",
    dataElement: "CXL5mg5l0cv",
    value: "10",
    providedElsewhere: false
    }
  ],
  notes: [ ]
  }
