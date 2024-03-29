import React, { Component } from "react";
import ReportList from '../Report/ReportList.jsx';
import '../Components.css';

const REPORTS_PER_PAGE = 8;

export default class ReportListHolder extends Component{
  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
      backArrow: "<",
      nextArrow: ">"
    };
  }

  componentDidMount(){
    this.setState({total: this.props.total});
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
  //The total in reportList is to ensure that the loading... gets removed if there is less than max elements on a page but all are loaded
  render() {
    const activePage = this.state.activePage;
    const reports = this.getReports(REPORTS_PER_PAGE*activePage-8,REPORTS_PER_PAGE*activePage);
    const max = (Math.ceil(this.props.reports.length/REPORTS_PER_PAGE));
		return (
      <div className="tableCenter">
        <ReportList user={this.props.user} reports={reports} id={this.props.id} total={this.props.reports.length - ((REPORTS_PER_PAGE < this.props.total) ? REPORTS_PER_PAGE : this.props.total)*(activePage-1)} max={(REPORTS_PER_PAGE < this.props.total) ? REPORTS_PER_PAGE : this.props.total}/>
        <div className="ReportListHolderFlex">
          <button className="ReportPageButtonArrow" onClick={() => {this.newPage(activePage - 1)}}>{this.state.backArrow}</button>
          <div> {(max) ? activePage : 0} / {max} </div>
          <button className="ReportPageButtonArrow" onClick={() => {this.newPage(activePage + 1)}}>{this.state.nextArrow}</button>
        </div>
      </div>
		);
	}
}
