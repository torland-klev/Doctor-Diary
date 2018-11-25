import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
import ReportHolder from '../Components/Report/ReportHolder.jsx';
import {RadioGroup, RadioButton} from 'react-radio-buttons';
import {Link} from 'react-router-dom';
import Api from '../Api.js';

export default class ApproveReject extends Component {
  constructor(props) {
      super(props);
      this.state = {
          title: "REVIEW REPORT",
          rows: [],
          newComment: "",
          oldComment: "",
          status: "",
          error: "", //Error messages will be added to here
          success: false //true is successfully sent
      };
      this.updateComment = this.updateComment.bind(this);
      this.sendToAPi = this.sendToApi.bind(this);
  }

  updateComment() {
      var newComment = document.getElementById("newComment").value
      this.setState({newComment: newComment});
  }

  sendToApi() {
      if(!(this.state.status)){
        this.setState({error: "Please select approve or reject"});
        return;
      }
      this.setState({error: ""});
      var report = this.props.location.state.report;
      var hasComment = false;
      var hasStatus = false;
      report.dataValues.forEach((el) => {
          //Setting new comment:
          if (el.dataElement === "yiAhmn4q7wJ") {
            hasComment = true;
            this.setState({oldComment: el.value})
            var d = new Date();
            var date = String(d.getDate()) + "." + String(d.getMonth()) + "."+ String(d.getFullYear());
            this.setState({newComment: this.state.oldComment + " *** Comment added by disctrict health officer on " + date + ":  " + this.state.newComment});
            el.value = this.state.newComment;
          }
          //Setting status (accepted/rejected):
          if (el.dataElement === "zrZADVnTtMa") {
            hasStatus = false;
            el.value = this.state.status;
          }
      })
      //Element not in report, so adds them
      if(!hasComment){
        report.dataValues.push({dataElement: "yiAhmn4q7wJ", value: this.state.newComment});
      }
      if(!hasStatus){
        report.dataValues.push({dataElement: "zrZADVnTtMa", value: this.state.status});
      }
      Api.UpdateDataToApiAR(report).then ( (status) => {
        if(status === 200){
          this.setState({success: true});
        } else {
          this.setState({success: false, error: status});
        }
      });
  }

render() {
    const report = this.props.location.state.report;
    return (this.state.success) ? (
        <div>
          <Header title={this.state.title} />
          <main>
            Report successfully edited.
            <a href='/' className='ReportPageButton'>Home</a>
          </main>
        </div>
      )
      : (
        <div>
            <Header title={this.state.title} />
            <main>
                <h1>Report for {report.dueDate.substring(0, 10)}</h1>
                <h2>Created by {report.storedBy}</h2>
                <h2>{this.state.error}</h2>
                <ReportHolder report={report} id="reportHolder"/>

                <input className="commentInput" type="text" onKeyUp={this.updateComment} id="newComment" placeholder="ADD COMMENT" />
                <div>
                  <RadioGroup onChange={(value) => {this.setState({status: value})}}>
                    <RadioButton value="APPROVED" padding={2} iconSize={7} iconInnerSize={7}>
                      Approve
                    </RadioButton>
                    <RadioButton value="REJECTED" padding={2} iconSize={7} iconInnerSize={7}>
                      Rejected
                    </RadioButton>
                  </RadioGroup>
                </div>

                <div className="TemporaryContainer">
                    <Link className="ReportPageButton" to={{pathname: '/dho/reportlist/report', state: {report: report, id: this.props.location.state.id, user: 'DHO'}}}>
                      Back
                    </Link>
                    <a onClick={this.sendToAPi}> <button className="ReportPageButton">Submit</button></a>
                </div>
            </main>
        </div>
    );
  }
}
