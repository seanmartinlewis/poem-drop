import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Link, IndexLink, hashHistory} from 'react-router';

class App extends Component {
  _logoutLink() {
     return (
       <a href='#' onClick={(e) => {
         e.preventDefault()
         this.props.route.auth.logout()
         hashHistory.push('/')
       }}>
         Logout
       </a>
     )
   }

  _loginLink() {
    return (
      <a href='#' onClick={(e) => {
        e.preventDefault();
        this.props.route.auth.login()
      }}>
        Login
      </a>
    )
  }

  render() {
    const auth = this.props.route.auth;
    let sessionLink = auth.loggedIn() ? this._logoutLink() : this._loginLink();
      if (auth.loggedIn() === true) {
          console.log('loggedIn');
      }

    let children = null;
     if (this.props.children) {
       children = React.cloneElement(this.props.children, {
         auth: this.props.route.auth
       })
     }

    return (
    <div>
      <div className="header">
        <IndexLink to="/" className="nav" activeClassName="active">Home</IndexLink>
        {' '}
        <Link className="nav" to="/PoemFlow" activeClassName="active">Poem Flow</Link>
        {' '}
        {sessionLink}
      </div>
      <div className='center' >
          <h2 className='title'>Poem Drop</h2>
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
    );
  }
}

export default App;
