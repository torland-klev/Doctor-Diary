import React, { Component } from 'react';
import ReportListHolder from '../Report/ReportListHolder.jsx';
import '../Components.css';
import '../../index.css';
import {RadioGroup, RadioButton} from 'react-radio-buttons';
import Api from '../../Api.js';

export default class HealthOfficerHome extends Component {
  constructor() {
      super();
      this.state = {
          reports: [],
          approved: [],
          rejected: [],
          pending: [],
          others: [],
          noStatus: [],
          pathname: "",
          web: false, //1 for true, 0 for false
          status: "" //Possible states: ALL, APPROVED, REJECTED, PENDING, OTHERS, NO_STATUS
      }
      this.updateSize = this.updateSize.bind(this);
  }

  componentWillMount(){
    window.removeEventListener("resize", this.updateSize);
    this.setState({reports: [], status: "ALL"});
  }

  componentDidMount(){
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
    const url = this.authenticate();
    Api.fetchReportsForList(url).then((result) => {
      this.setState({reports: result.reports, approved: result.approved, rejected: result.rejected, pending: result.pending, others: result.others, noStatus: result.noStatus});
    });
  }

  updateSize(){
    this.setState({ web: window.innerWidth > 650 });
  }

  authenticate(){
    var id = "";
    var url = "";
    if (this.props.user === "DOCTOR") {
      //Doctor
      id = this.props.id;
      url = '/events?paging=false&trackedEntityInstance=' + id;
      this.setState({pathname: '/doctor'});
    } else {
      //DHO
      id = this.props.id;
      url = '/events?paging=false&orgUnit=' + id;
      this.setState({pathname: '/dho'});
    }
    return url;
  }

  onRadioChange(value){
    this.setState({status: value});
  }

  render() {
    var reports = [];
    switch (this.state.status) {
      case "ALL":
        reports = this.state.reports;
        break;
      case "APPROVED":
        reports = this.state.approved;
        break;
      case "REJECTED":
        reports = this.state.rejected;
        break;
      case "PENDING":
        reports = this.state.pending;
        break;
      case "OTHERS":
        reports = this.state.others;
        break;
      case "NO_STATUS":
        reports = this.state.noStatus;
        break;
      default:
        reports = this.state.reports;
      }
      const web = this.state.web;
    return (web) ? (
          <div className="tableCenter">
            <ReportListHolder user={this.props.user} reports={reports} id={this.props.id} total={this.state.reports.length}/>
            <div className="RadioGroup">
              <RadioGroup onChange={(value) => this.onRadioChange(value)} value='' horizontal>
                    <RadioButton value="ALL" padding={2} iconSize={7} iconInnerSize={7}>
                      All
                    </RadioButton>
                    <RadioButton value="APPROVED" padding={2} iconSize={7} iconInnerSize={7}>
                      Approved
                    </RadioButton>
                    <RadioButton value="REJECTED" padding={2} iconSize={7} iconInnerSize={7}>
                      Rejected
                    </RadioButton>
                    <RadioButton value="PENDING" padding={2} iconSize={7} iconInnerSize={7}>
                      Pending
                    </RadioButton>
                    <RadioButton value="OTHERS" padding={2} iconSize={7} iconInnerSize={7}>
                      Others
                    </RadioButton>
                    <RadioButton value="NO_STATUS" padding={2} iconSize={7} iconInnerSize={7}>
                      No Status
                    </RadioButton>
              </RadioGroup>
            </div>
          </div>
    ) : (
      <div className="tableCenter">
      <ReportListHolder user={this.props.user} reports={reports} id={this.props.id} total={this.state.reports.length}/>
      <div className="RadioGroup">
        <RadioGroup onChange={(value) => this.onRadioChange(value)} value='' >
              <RadioButton value="ALL" padding={2} iconSize={7} iconInnerSize={7}>
                All
              </RadioButton>
              <RadioButton value="APPROVED" padding={2} iconSize={7} iconInnerSize={7}>
                Approved
              </RadioButton>
              <RadioButton value="REJECTED" padding={2} iconSize={7} iconInnerSize={7}>
                Rejected
              </RadioButton>
              <RadioButton value="PENDING" padding={2} iconSize={7} iconInnerSize={7}>
                Pending
              </RadioButton>
              <RadioButton value="OTHERS" padding={2} iconSize={7} iconInnerSize={7}>
                Others
              </RadioButton>
              <RadioButton value="NO_STATUS" padding={2} iconSize={7} iconInnerSize={7}>
                No Status
              </RadioButton>
        </RadioGroup>
      </div>
    </div>
    )
  }
}
