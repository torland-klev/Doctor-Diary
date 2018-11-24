import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import ReportHolder from '../Components/Report/ReportHolder.jsx';
import {RadioGroup, RadioButton} from 'react-radio-buttons';
import {Link} from 'react-router-dom';

export default class ApproveReject extends Component {


  constructor(props) {
      super(props);
      this.state = {
          rows: [],
          newComment: "",
          oldComment: "",
          status: ""
      };
      this.updateComment = this.updateComment.bind(this);
      this.sendToAPi = this.sendToApi.bind(this);
  }


  updateComment() {
      var newComment = document.getElementById("newComment").value
      this.setState({newComment: newComment});
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
        <div>
            <Header title={this.state.title} />
            <main>
                <h1>Report for {report.dueDate.substring(0, 10)}</h1>
                <h2>Created by {report.storedBy}</h2>

                <ReportHolder report={report} id="reportHolder"/>

                <input className="commentInput" type="text" onKeyUp={this.updateComment} id="newComment" placeholder="ADD COMMENT" />
                <div>
                  <RadioGroup onChange={(value) => {this.setState({status: value})}} value='' horizontal>
                    <RadioButton value="ACCEPT" padding={2} iconSize={7} iconInnerSize={7}>
                      Accept
                    </RadioButton>
                    <RadioButton value="DECLINE" padding={2} iconSize={7} iconInnerSize={7}>
                      Decline
                    </RadioButton>
                  </RadioGroup>
                </div>

                <div className="TemporaryContainer">
                    <Link className="ReportPageButton" to={{pathname: '/dho/reportlist/report', state: {report: report, id: this.props.location.state.id, user: 'DHO'}}}>
                      Back
                    </Link>
                    <a href='/confirmFeedback' onClick={this.sendToAPi}> <button className="ReportPageButton">Submit</button></a>
                </div>
            </main>
        </div>
    );
  }
}
