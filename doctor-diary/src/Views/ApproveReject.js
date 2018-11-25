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
          status: "",
          error: ""
      };
      this.updateComment = this.updateComment.bind(this);
      this.sendToAPi = this.sendToApi.bind(this);
      this.UpdateDataToApi = this.UpdateDataToApi.bind(this);
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
      console.log(report);
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
      console.log(report);
      this.UpdateDataToApi(report);

      console.log(report)
  }

  //Duplikat fra confirmsendreport med put
  UpdateDataToApi(eventElement){

      const authKey = 'Basic ' + btoa("BjarneB:District1-");
      var id = eventElement.event;

      fetch("https://course.dhis2.org/dhis/api/events/"+id, {
        method: 'PUT',
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



render() {
    const report = this.props.location.state.report;
    return (
        <div>
            <Header title={this.state.title} />
            <main>
                <h1>Report for {report.dueDate.substring(0, 10)}</h1>
                <h2>Created by {report.storedBy}</h2>
                <h2>{this.state.error}</h2>
                <ReportHolder report={report} id="reportHolder"/>

                <input className="commentInput" type="text" onKeyUp={this.updateComment} id="newComment" placeholder="ADD COMMENT" />
                <div>
                  <RadioGroup onChange={(value) => {this.setState({status: value})}} horizontal>
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
                    <a  onClick={this.sendToAPi}> <button className="ReportPageButton">Submit</button></a>
                </div>
            </main>
        </div>
    );
  }
}
