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
      var report = this.props.location.state.report;
      console.log(report);
      report.dataValues.forEach((el) => {
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
    const report = this.props.location.state.report;
      return (

          <div className="Home">
              <Header title={this.state.title} />
              <main className="Home-main">
              <h1>Report for {report.dueDate.substring(0, 10)}</h1>
              <h1>Created by {report.storedBy}</h1>

              <ReportHolder report={report} id="reportHolder"/>

               <input type="text" onKeyUp={this.updateComment} id="newComment" placeholder="...Your comment here..." />

               <DropdownMenu id="dropdownMenu" setStatus={this.setStatus}/>

               <a href='/confirmFeedback' onClick={this.sendToAPi} className="Home-button">Sumbit answer</a>
               <BackButton title={this.state.backbutton} link={this.state.backbuttonlink} />

              </main>
          </div>
        )
  }
}
