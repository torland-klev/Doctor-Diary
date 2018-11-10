import React from 'react';
import '../styles/xkcd.css';

class XKCD extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imgURL: ''
    }
  }

  update(){
    let number = Math.floor(Math.random() * (2055-1+1)) + 1;
    const url = 'https://xkcd.com/' + number + '/info.0.json';
    this.apiCall(url);
  }

  apiCall(url){
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      let imgURL = responseJson.img;
      this.setState({imgURL: imgURL});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render(){
    return (
      <div id="xkcd"><img src={this.state.imgURL} alt='Play a move to get a comic!'/></div>
    );
  }
}

export default XKCD;
