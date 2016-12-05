import React, { PropTypes as T } from 'react';
import './App.css';
import {Link, IndexLink, hashHistory} from 'react-router';
import AuthService from './utils/AuthService';


class App extends React.Component {
  static contextTypes = {
  router: T.object
}

static propTypes = {
  auth: T.instanceOf(AuthService)
}

constructor(props, context) {
  super(props, context)
  this.state = {
    profile: this.props.route.auth.getProfile()
  }
}

  _logoutLink() {
     return (
       <div>
       <a href='#' onClick={(e) => {
         e.preventDefault()
         this.props.route.auth.logout()
         hashHistory.push('/')
       }}>
         Logout
       </a>
       <img src={this.state.profile.picture} alt="pic" className="profile"/>
       <p>{this.state.profile.name}</p>
       <p>{this.state.profile.email}</p>
       <p>{this.state.profile.nickname}</p>
       </div>
     )
   }

  _loginLink() {
    return (
      <div>
      <a href='#' onClick={(e) => {
        e.preventDefault();
        this.props.route.auth.login()
      }}>
        Login
      </a>
      </div>
    )
  }

  render() {
    const auth = this.props.route.auth;
    // const { profile } = this.state
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
        <div className='nav'>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {' '}
        <Link to="/PoemFlow" activeClassName="active">Poem Flow</Link>
        {' '}
        <Link to="/Compose" activeClassName="active">Compose</Link>
        {' '}
        </div>

        <h2 className='title'>Poem Drop</h2>
        {sessionLink}
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
    );
  }
}

export default App;
