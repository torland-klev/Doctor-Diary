import React from 'react';
import Bishop from './Pieces/Bishop';
import King from './Pieces/King';
import Knight from './Pieces/Knight';
import Pawn from './Pieces/Pawn';
import Queen from './Pieces/Queen';
import Rook from './Pieces/Rook';

const chessPieces = {
  King, Queen, Bishop, Knight, Rook, Pawn
};

const blackStyle = {
  backgroundColor: '#512301',
  minWidth: '60px',
  maxWidth: '60px',
  height: '60px'
};

const whiteStyle = {
  backgroundColor: '#DABD9D',
  minWidth: '60px',
  maxWidth: '60px',
  height: '60px'
};

class Square extends React.Component {
  render() {
    let piece = this.props.piece;
    piece = (piece) ? React.createElement(chessPieces[piece.type], {ref: 'piece', owner: piece.owner}) : '';

    return (
      <div style={(this.props.color === 'white') ? whiteStyle : blackStyle}>
        {/*
        Used to display column + row name
        {this.props.col + '' + this.props.row}
        */}
        {piece}
      </div>
    );
  }
}

export default Square;
