import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    <div>
      <div className='center' >
          <h2 className='title'>Poem Drop</h2>
          <button className='button'>LOG IN</button>
      </div>
      <div className='content'>
        {this.props.children}
      </div>
    </div>
    );
  }
}

export default App;
