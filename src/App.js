import React, { PropTypes as T } from 'react';
import './App.css';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
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
         <Dropdown>
           <DropdownTrigger><img src={this.state.profile.picture} alt="pic" className="profilePic"/></DropdownTrigger>
           <DropdownContent>
               <ul className="dropdownCon">
                   <li>
                       <p className="dropdownCon">{this.state.profile.email}</p>
                   </li>
                   <li>
                   <a className="logoutButton dropdownCon" href='#' onClick={(e) => {
                     e.preventDefault()
                     this.props.route.auth.logout()
                     hashHistory.push('/')
                   }}>
                     Logout
                   </a>
                   </li>
               </ul>
           </DropdownContent>
       </Dropdown>
       <p className="username">{this.state.profile.nickname}</p>
       </div>
     )
   }

  _loginLink() {
    return (
      <div className="profileWelcome">
      <a className="loginButton buttonForm" href='#' onClick={(e) => {
        e.preventDefault();
        this.props.route.auth.login()
      }}>
        log in :: sign up
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
      <div>
        <div className="header">
          <h2 className='titleOfApp'>POEM DROP</h2>
          {sessionLink}
        </div>
          <div className='nav'>
            <IndexLink className="navLink" to="/" activeClassName="active">compose</IndexLink>
            {' '}
            <Link className="navLink" to="/Collection" activeClassName="active">collection</Link>
            {' '}
            <Link className="navLink" to="/PoemFlow" activeClassName="active">published</Link>
            {' '}
          </div>
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
    );
  }
}

export default App;
