import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home.js'
import PoemFlow from './PoemFlow'
import Collection from './Collection'
// import Compose from './Compose'
import './index.css';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import AuthService from './utils/AuthService';

const auth = new AuthService('gIwkaePZpccdxCUTtb0BPxa63nyCLcXa', 'rattlesnakemilk.auth0.com')

const requireAuth = (nextState, replace) => {
   console.log('requireAuth');
   if (!auth.loggedIn()) {
     replace({
       pathname: '/'
     })
   }
 }


ReactDOM.render(
 <Router history={hashHistory}>
 <Route path='/' component={App} auth={auth}>
   <IndexRoute component={Home} />
   <Route path='Collection' component={Collection} onEnter={requireAuth}/>
   <Route path='PoemFlow' component={PoemFlow} onEnter={requireAuth}/>
   {/* <Route path='Compose' component={Compose} onEnter={requireAuth}/> */}
   <Route path="/access_token=:token" component={Home} />
   {/* <Route path=”contact” component={Contact}/> */}
 </Route>
 </Router>,
 document.getElementById('root')
);
