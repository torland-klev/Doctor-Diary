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

class Queen extends React.Component {
  render() {
    return (
      <div className="chesspiece" style={(this.props.owner === 'white') ? whiteStyle : blackStyle}>
        {(this.props.owner === 'white') ? String.fromCharCode(9813) : String.fromCharCode(9819) }
      </div>
    );
  }
}

export default Queen;
