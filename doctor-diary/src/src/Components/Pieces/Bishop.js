import React from 'react';
import '../../styles/chesspieces.css';

const blackStyle = {
  textShadow: '1px 0 black',
  color: 'black'
};

const whiteStyle = {
  textShadow: '1px 0 white',
  color: 'white'
};

class Bishop extends React.Component {
  render(){
    return (
      <div className="chesspiece" style={(this.props.owner === 'white') ? whiteStyle : blackStyle}>
        {(this.props.owner === 'white') ? String.fromCharCode(9815) : String.fromCharCode(9821)}
      </div>
    );
  }
}

export default Bishop;
