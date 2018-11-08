import React, { Component } from 'react';
import Test from './Views/Test.js'
import Home from './Views/Home.js'
import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      //<Browse Router> brukes for å linke til andre sider til applikasjonen, må importeres over
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (<div className="App"> <Home /> </div>)} />
          <Route exact={true} path='/test' render={() => (<div className="App"> <Test /></div>)} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
