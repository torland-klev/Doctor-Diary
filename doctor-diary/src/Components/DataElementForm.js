import React, { Component } from 'react';


export default class DataElementForm extends Component {
  constructor(props) {
      super(props);
      console.log(this.props)
      this.id = props.id;
      this.name = props.name;
      this.dataContent = props.dataContent;
      this.updateData = this.updateData.bind(this);
      this.props.callbackFromParent(this.id, this.dataContent);
  }

  updateData() {
    var newDataContent = document.getElementById(this.id).value
    this.dataContent = newDataContent
    this.props.callbackFromParent(this.id, this.dataContent)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p type="text" id={this.name}>{this.name}</p>
          <input type={this.valueType} name={this.name} onKeyUp={this.updateData} id={this.id} defaultValue={this.dataContent} placeholder="..." />
        </label>
      </form>
    );
  }



}
