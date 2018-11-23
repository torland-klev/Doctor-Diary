import React, { Component } from 'react';
import Header from '../Components/Header/Header.js';
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
        <div>
            <Header title={this.state.title} />
            <main>
                <h1>Report for {report.dueDate.substring(0, 10)}</h1>
                <h2>Created by {report.storedBy}</h2>

                <ReportHolder report={report} id="reportHolder"/>

                <input className="commentInput" type="text" onKeyUp={this.updateComment} id="newComment" placeholder="ADD COMMENT" />

                {/** TODO Istedenfor dropdown kan vi bruke radiokapper? */}
                <DropdownMenu id="dropdownMenu" setStatus={this.setStatus}/>

                <div className="TemporaryContainer">
                    {/** <a href='/dho/reportlist/report'><button className="ReportPageButton">Back</button></a>*/} {/** TODO: Back knapp funker ikke, sikkert pga indeksering */}
                    <a href='/confirmFeedback' onClick={this.sendToAPi}> <button className="ReportPageButton">Submit</button></a>
                </div>
            </main>
        </div>
    );
  }
}
