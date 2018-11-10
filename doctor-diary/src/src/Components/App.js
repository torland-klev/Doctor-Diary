import React from 'react';
import Board from './Board';
import XKCD from './XKCD';
import config from '../config/config';

class App extends React.Component {

  constructor(props){
    super(props);
    this.child = React.createRef();
  }

  update = () => {
    this.child.current.update();
  }

  render(){
    return (
      <div className="Wrapper">
        <Board initialSetup={config.initialSetup} update={this.update}/>
        <XKCD ref={this.child} />
      </div>
    );
  }
}

export default App;
