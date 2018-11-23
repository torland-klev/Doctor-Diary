import React, { Component } from 'react';
import Header from '../../Components/Header/Header.js';
import ReportListHolder from '../../Components/Report/ReportListHolder.jsx';
import {Link} from 'react-router-dom';
import {RadioGroup, RadioButton} from 'react-radio-buttons';

const STATUS_ID = "zrZADVnTtMa";

export default class HealthOfficerHome extends Component {
  constructor() {
      super();
      this.state = {
          title: "HEALTH OFFICER REPORT LIST",
          backbutton: "Back",
          backbuttonlink: "/dho",
          reports: [],
          approved: [],
          rejected: [],
          pending: [],
          others: [],
          noStatus: [],
          status: "" //Possible states: ALL, APPROVED, REJECTED, PENDING, OTHERS, NO_STATUS
      }
  }

  componentWillMount(){
    this.setState({reports: [], status: "ALL"});
  }

  componentDidMount(){
    this.fetchReports().then((result) => {
      this.setState({reports: result.reports, approved: result.approved, rejected: result.rejected, pending: result.pending, others: result.others, noStatus: result.noStatus});
    });
  }

  fetchReports(){
    const id = this.props.location.state.id;
    const url = 'https://course.dhis2.org/dhis/api/events?paging=false&orgUnit=' + id;
		return fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Basic YWRtaW46ZGlzdHJpY3Q='
			}
		})
			.then((response) => response.json())
	    .then((responseJson) => {
        var reports = [];
        var approved = [];
        var rejected = [];
        var pending = [];
        var others = [];
        var noStatus = [];
	      responseJson.events.forEach((el) => {
          reports.push(el);
          var hasStatus = false;
          var status = "";
          el.dataValues.forEach( (dv) => {
            if (dv.dataElement === STATUS_ID){
              hasStatus = true;
              switch(dv.value){
                case "approved":
                  approved.push(el);
                  break;
                case "rejected":
                  rejected.push(el);
                  break;
                case "pending":
                  pending.push(el);
                  break;
                default:
                  others.push(el);
              }
            }
          })
          if(!hasStatus){
            noStatus.push(el);
          }
				})
        const results = {
          reports: reports,
          approved: approved,
          rejected: rejected,
          pending: pending,
          others: others,
          noStatus: noStatus
        }
        return results;
	    })
	    .catch((error) => {
	      console.error(error);
	    }
		);
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
    return (
      <div className="Home">
          <Header title={this.state.title} />
          <main className="Home-main">
              <ReportListHolder reports={reports} id={this.props.location.state.id} total={this.state.reports.length}/>
              <div className="RadioGroup">
                <RadioGroup onChange={(value) => this.onRadioChange(value)} value='' horizontal>
                  <RadioButton value="ALL">
                    All
                  </RadioButton>
                  <RadioButton value="APPROVED">
                    Approved
                  </RadioButton>
                  <RadioButton value="REJECTED">
                    Rejected
                  </RadioButton>
                  <RadioButton value="PENDING">
                    Pending
                  </RadioButton>
                  <RadioButton value="OTHERS">
                    Others
                  </RadioButton>
                  <RadioButton value="NO_STATUS">
                    No Status
                  </RadioButton>
                </RadioGroup>
              </div>
              <Link to={{pathname: '/dho'}}>
                      <div className="ReportPageButton">{this.state.backbutton}</div>
              </Link>
          </main>
      </div>
    )
  }
}
