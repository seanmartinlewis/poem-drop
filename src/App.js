import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Link, IndexLink} from 'react-router';

class App extends Component {
  constructor(props){
    super(props);

  }
  render() {
    return (
    <div>
      <div className="header">
        <IndexLink to="/" className="nav" activeClassName="active">Home</IndexLink>
        {' '}
        <Link className="nav" to="/PoemFlow" activeClassName="active">Poem Flow</Link>
      </div>
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
