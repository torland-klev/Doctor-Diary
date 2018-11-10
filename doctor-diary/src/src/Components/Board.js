import React from 'react';
import Square from './Square';
import '../styles/board.css';

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: [],
      pieces: {},
      moveInProgress: false,
      clickedPieceID: null,
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      whiteMove: true,
      fullMoveCounter: 0,
      halfMoveCounter: 0,
      result: [],
      moves: [0,0,0]
    }
  }
  componentWillMount() {
    this.initBoard();
  }
  componentDidMount(){
    this.initPieces();
    this.apiCall(this.state.fen);
  }

  onClick(e){
    this.startClick(e.pageX, e.pageY);
  }

  /*
   * This function runs when the board is clicked.
   * If no previous pieces have been pressed, it will
   * do some error checking and mark the piece as checked.
   * The next time a square is pressed, it will try to call
   * completeClick().
   */
  startClick(xPos, yPos){
    /* Get the position of the clicked square */
    var xID = (xPos > 487) ? -1 : Math.floor((xPos-8)/60);
    var yID = (yPos > 487) ? -1 : Math.floor((yPos-8)/60);
    if (xID * yID < 0){
      return 0;
    }
    var squareID = xID + (yID * 8);
    const squares = this.state.squares;
    /* Checks if first clicked square is empty */
    if (!this.state.moveInProgress && squares[squareID].piece == null){
      this.setState({moveInProgress: false, clickedPieceID: null});
    }
    /* First piece allready chosen, complete the placement of the piece */
    else if (this.state.moveInProgress){
      this.completeClick(squareID);
    }
    /* Make sure that only the white can move white pieces */
    else if (this.state.whiteMove && squares[squareID].piece.owner === 'black') {
      this.setState({moveInProgress: false, clickedPieceID: null});
    }
    /* Make sure that only the black can move black pieces */
    else if ((!this.state.whiteMove) && squares[squareID].piece.owner === 'white') {
      this.setState({moveInProgress: false, clickedPieceID: null});
    }
    /* First click successfull, waiting for next click */
    else {
      this.setState({moveInProgress: true, clickedPieceID: squareID});
    }
  }


  /*
   * Function runs when when a move is in progress.
   * A move is considered in progress when a piece has
   * previously been pressed.
   */
  completeClick(squareID){
    const squares = this.state.squares;
    const piece = squares[this.state.clickedPieceID].piece;
    let whiteMove = !this.state.whiteMove;
    /* Check for en passant */
    let enpassant = ((Math.abs(squareID-this.state.clickedPieceID) === 16) && (piece.type === 'Pawn')) ? true : false;
    /* Check for half move, a half move is a move with a piece that has not captured */
    let halfmove = ((piece.type === 'Pawn') || (squares[squareID].piece)) ? false : true;
    squares[this.state.clickedPieceID].piece = null;
    squares[squareID].piece = piece;
    const moveCounter = this.state.moveCounter + 1;
    this.writeMove(enpassant, squareID, halfmove);
    this.setState({moveInProgress: false, clickedPieceID: null, moveCounter: moveCounter, whiteMove: whiteMove});
    this.props.update();
  }

  /*
   * This method prints the board to FEN
   * FEN: "Forsynth-Edwards-notation"
   * This notation is used for communication with the lichess API
   * All the %20 are actually spaces
   */
  writeMove(enpassant, squareID, halfmove){
    let fenCurrent = '';
    /* Start by printing all the pieces */
    let counter = 0;
    let rowCount = 0;
    this.state.squares.forEach((square) => {
      if (!(counter % 8)){
        if (rowCount) fenCurrent += (rowCount);
        rowCount = 0;
        if (counter) fenCurrent+='/';
      }
      if (square.piece){
        if (rowCount) fenCurrent += (rowCount);
        rowCount = 0;
        fenCurrent += (square.piece.notation);
      } else{
        rowCount++;
      }
      counter++;
    });
    /* Add player to make next move */
    fenCurrent += (this.state.whiteMove) ? '%20b' : '%20w';
    /* TODO: Add castling rights, for now castling allowed at all times */
    /* Note: this will be impossible without coding in allowed moves for
             each piece. This is too much for this assignement. The
             engine will therefore be somewhat limited.
             UPDATE: the engine does not seem to care a lot about
             en passant or halfmove clock. */
    fenCurrent += '%20KQkq';
    /* Add enpassant rule */
    fenCurrent += (enpassant) ? ('%20' + this.state.squares[squareID].chessId) : '%20-';
    /* Add halfmove clock, still not enforced though */
    if (halfmove){
      let halfMoveCounter = this.state.halfMoveCounter + 1;
      fenCurrent += '%20' + halfMoveCounter;
      this.setState({halfMoveCounter: halfMoveCounter});
    } else {
      fenCurrent += '%20' + this.state.halfMoveCounter;
    }
    /* Add a full move to the counter after black moves */
    if (!this.state.whiteMove){
      let fullMoveCounter = this.state.fullMoveCounter + 1;
      fenCurrent += '%20' + fullMoveCounter;
      this.setState({fullMoveCounter: fullMoveCounter});
    }
    else {
      fenCurrent += '%20' + this.state.fullMoveCounter;
    }
    this.setState({fen: fenCurrent});
    this.apiCall(fenCurrent);
  }

  /*
   * Calls the lichess explorer API to find how many times the
   * same position has been played.
   */
  apiCall(fen){
    const url = 'https://explorer.lichess.ovh/master?fen=' + fen;
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      let result = [
        responseJson.white,
        responseJson.draws,
        responseJson.black
      ];
        /* Let do some lazy coding! */
      const move1 = (responseJson.moves[0]) ? responseJson.moves[0].san : 'None found';
      const move2 = (responseJson.moves[1]) ? responseJson.moves[1].san : 'None found';
      const move3 = (responseJson.moves[2]) ? responseJson.moves[2].san : 'None found';
      let moves = [
        move1,
        move2,
        move3
      ];
      this.setState({result: result, moves: moves});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  /* Give the square the correct colors */
  colorPicker(index, row){
    if (index % 2){
      if (row % 2) {
        return 'white';
      }
      return 'black';
    }
    if (row % 2){
      return 'black';
    }
    return 'white';
  }

  /* initPieces() and initBoard() is mostly taken and adapted from
   * https://github.com/ryanheathers/react-chess
   */
  initBoard(){
    const squares = [];
    const rows = [];
    const cols = [];
    const colNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    // pre-populate rows & cols with blank arrays
    for (let i = 0; i < 8; i++) {
      rows[i] = [];
      cols[i] = [];
    }

    // fill board with squares
    for (let counter = 0, i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {

        let color = this.colorPicker(counter, 8-i);

        let square = {
          index: counter,
          chessId: String(colNames[j] + (8 - i)),
          row: 8-i,
          col: colNames[j],
          piece: null,
          color: color
        }
        squares[counter] = square;
        rows[i][j] = square;
        cols[j][i] = square;
        counter++;
      }
    }
    this.setState({squares: squares});
  }


  /* Found no simple way to move this complexity into the pieces themselves.
   * I guess hardcoding the notations work aswell.
   * As the children cannot change or read their own props, and
   * reading the state of a component can be complex, I found this to
   * be the easiest solution.
   */
  getNotation(owner, type){
    if (owner === 'black'){
      switch(type){
        case 'Rook':
          return 'r';
        case 'Knight':
          return 'n';
        case 'Bishop':
          return 'b';
        case 'King':
          return 'k';
        case 'Queen':
          return 'q';
        case 'Pawn':
          return 'p';
        default:
          return null;
      }
    }
    switch(type){
      case 'Rook':
        return 'R';
      case 'Knight':
        return 'N';
      case 'Bishop':
        return 'B';
      case 'King':
        return 'K';
      case 'Queen':
        return 'Q';
      case 'Pawn':
        return 'P';
      default:
        return null;
    }

  }
  /* Initiate the pieces onto the board, reads into from config file */
  initPieces() {
    const {squares, pieces} = this.state;

    this.props.initialSetup.forEach((item) => {
      let piece = {
        location: item[0],
        type: item[1],
        owner: item[2],
        id: item[3],
        notation: this.getNotation(item[2], item[1])
      }

      squares[item[0]].piece = piece;
      pieces[piece.id] = piece;
    });

    this.setState({pieces: pieces});
    this.setState({squares: squares});
  }

  render() {

    let squares = this.state.squares.map(function(square, index){
      return(
        <Square
          index={square.index}
          ref={index}
          key={index}
          row={square.row}
          col={square.col}
          color={square.color}
          piece={square.piece}/>
      )});

    // Process squares into rows of length 8
    // Doing it this way rather than rendering state.rows directly allows for squares to be indexed properly
    let rows = [];
    let chunk = 8;
    for (let i = 0; i < squares.length; i += chunk) {
      rows.push(squares.slice(i, i + chunk));
    }

    return (
      <div className="wrapper">
        <main>
          <div className="board" onClick={this.onClick.bind(this)}>
            {rows.map((row, index) => {
              return <div className="row" key={index}>{row}</div>
            })}
          </div>
        </main>
        <div className="datawrapper">
          <div className="results">
            {'Previous results:'}<br /><br />
            {'White wins: ' + this.state.result[0]}<br />
            {'Black wins: ' + this.state.result[1]}<br />
            {'Draws: ' + this.state.result[2]}<br />
          </div>
          <div className="moves">
            {'Suggested moves:'}<br /><br />
            {'1: ' + this.state.moves[0]}<br />
            {'2: ' + this.state.moves[1]}<br />
            {'3: ' + this.state.moves[2]}<br />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
