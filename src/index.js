import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home.js'
import PoemFlow from './PoemFlow'
import './index.css';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

ReactDOM.render(
 <Router history={hashHistory}>
 <Route path='/' component={App}>
 <IndexRoute component={Home} />
 <Route path='PoemFlow' component={PoemFlow}/>
 {/* <Route path=”contact” component={Contact}/> */}
 </Route>
 </Router>,
 document.getElementById('root')
);
