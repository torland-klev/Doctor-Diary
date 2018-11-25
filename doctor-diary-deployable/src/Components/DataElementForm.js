import React, { Component } from 'react';
import './Components.css';
import '../index.css';


export default class DataElementForm extends Component {
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
      <form onSubmit={this.handleSubmit} className="dataForm">
        <label>
         {this.name}
          <input type={this.valueType} name={this.name} onKeyUp={this.updateData} id={this.id} defaultValue={this.dataContent} placeholder={this.expected} />
        </label>
      </form>
    );
  }



}
