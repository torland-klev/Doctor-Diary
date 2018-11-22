import React, { Component } from "react";
import ReportList from '../Report/ReportList.jsx';

const REPORTS_PER_PAGE = 8;

export default class ReportListHolder extends Component{
  constructor(props){
    super(props);
    this.state = {
      activePage: 1
    };
  }

  getReports(start, end){
    if(end > this.props.reports.length){
      end = this.props.reports.length;
    }
    const allReports = this.props.reports;
    var reports = [];
    for (var i = start; i < end; i++){
      reports.push(allReports[i]);
    }
    return reports;
  }

  newPage(i){
    //Check for first page
    if (i < 1){
      this.setState({activePage: 1});
    }
    //Check for last page
    else if (i > (Math.ceil(this.props.reports.length/REPORTS_PER_PAGE))){
      this.setState({activePage: (Math.ceil(this.props.reports.length/REPORTS_PER_PAGE))});
    }
    else {
      this.setState({activePage: i});
    }
  }

  render() {
    const activePage = this.state.activePage;
    const reports = this.getReports(REPORTS_PER_PAGE*activePage-8,REPORTS_PER_PAGE*activePage);
    const max = (Math.ceil(this.props.reports.length/REPORTS_PER_PAGE));
		return (
      <div>
        <ReportList reports={reports} id={this.props.id} total={(REPORTS_PER_PAGE<this.props.total) ? REPORTS_PER_PAGE : this.props.total}/>
        <div className="ReportActivePages">
          <button className="ReportPageButtonBack" onClick={() => {this.newPage(activePage - 1)}}>{"<"}</button>
          <div> {activePage} / {max} </div>
          <button className="ReportPageButtonNext" onClick={() => {this.newPage(activePage + 1)}}>{">"}</button>
        </div>
      </div>
		);
	}
}
