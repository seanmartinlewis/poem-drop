import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home.js'
import './index.css';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

ReactDOM.render(
 <Router history={hashHistory}>
 <Route path='/' component={App}>
 <IndexRoute component={Home} />
 {/* <Route path=”resume” component={Resume}/>
 <Route path=”contact” component={Contact}/> */}
 </Route>
 </Router>,
 document.getElementById('root')
);
