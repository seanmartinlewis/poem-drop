import React, { PropTypes as T } from 'react';
import './App.css';
// import {Link, IndexLink, hashHistory} from 'react-router';
import axios from 'axios';
import AuthService from './utils/AuthService';

class Home extends React.Component {
  static contextTypes = {
  router: T.object
}

static propTypes = {
  auth: T.instanceOf(AuthService)
}
  constructor(props){
    super(props);

    this.state = {
      poems: []
    }

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit(e) {
    e.preventDefault()
    console.log('hello');
    let poemTitle = this.refs.titleP.value;
    let poemBody = this.refs.poemBody.value;
    console.log(poemTitle);
    console.log(poemBody);
    axios.post('http://localhost:3000/poems', {
      poem: {
        title: poemTitle,
        poem: poemBody,
        public: false
      }
    }, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(response => {
      let poem = response.data;
      let poems = this.state.poems
      poems.push(poem)
      this.setState({
        poems: poems
      })
      this.refs.titleP.value = '';
      this.refs.poemBody.value = '';
    })
  }

  render(){
    const auth = this.props.auth;
    if (auth.loggedIn() === false) {
        console.log('loggedIn H');
        return(
          <div className="home">
            <h1>Poem</h1>
          </div>
        )
    } else {
      return(
        <div className="home">
          <form onSubmit={this._handleSubmit}>
             <input type="text" ref="titleP" placeholder="title" /><br />
             <textarea rows="20" cols="60" ref="poemBody" placeholder="Place Your Poem Here"/><br />
             <input type="checkbox" ref="public" />Public<br />
             <input type="submit" />
           </form>
        </div>
      )
    }

  }
}

export default Home;
