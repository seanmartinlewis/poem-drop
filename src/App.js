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
    profile: this.props.route.auth.getProfile(),
    poem: 'Click on Poem To load'
  }
}

  _logoutLink() {
     return (
       <div className="profile">
       <a href='#' onClick={(e) => {
         e.preventDefault()
         this.props.route.auth.logout()
         hashHistory.push('/')
       }}>
         Logout
       </a>
       <img src={this.state.profile.picture} alt="pic" className="profilePic"/>
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
        <h2 className='title'>Poem Drop</h2>
          <div className='nav'>
            <IndexLink className="navLink" to="/" activeClassName="active">Compose</IndexLink>
            {' '}
            <Link className="navLink" to="/Collection" activeClassName="active">Collection</Link>
            {' '}
            <Link className="navLink" to="/PoemFlow" activeClassName="active">Poem Flow</Link>
            {' '}
            <Link className="navLink" to="/Profile" activeClassName="active">Profile</Link>
            {' '}
          </div>
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
