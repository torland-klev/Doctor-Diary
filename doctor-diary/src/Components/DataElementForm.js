import React, { Component } from 'react';


export default class DataElementForm extends React.Component {



  constructor(props) {
      
      super(props);
      this.id = props.id;
      this.name = props.name;
      this.dataContent = props.dataContent;
      this.valueType = props.valueType;
      this.expected = "";
      
      this.updateData = this.updateData.bind(this);
      this.props.callbackFromParent(this.id, this.dataContent);
    
  }



  updateData() {
    var newDataContent = document.getElementById(this.id).value
    this.dataContent = newDataContent
    this.props.callbackFromParent(this.id, this.dataContent);
  }


  componentWillMount(){
    if(this.valueType === "NUMBER" || this.valueType === "INTEGER"){

      this.expected = "number";
    }else{

      this.expected = "text";
    }
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p type="text" id={this.name}>{this.name}</p>
          <p type="text"><small>Expected value: {this.expected}</small></p>
          <input type={this.valueType} name={this.name} onKeyUp={this.updateData} id={this.id} defaultValue={this.dataContent} placeholder="..." />
        </label>
      </form>
    );
  }



}
