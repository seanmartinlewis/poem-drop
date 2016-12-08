import React, { PropTypes as T } from 'react';
import './App.css';
// import {Link, IndexLink, hashHistory} from 'react-router';
import Thesaurus from "./Thesaurus";
import Dictionary from "./Dictionary";
import Rhyme from "./Rhyme";
import axios from 'axios';
import AuthService from './utils/AuthService';

class Home extends React.Component {
  static contextTypes = {
  router: T.object
}

static propTypes = {
  auth: T.instanceOf(AuthService)
}
  constructor(props, context){
    super(props, context);

    this.state = {
      profile: this.props.auth.getProfile(),
      poems: []
    }

    this._handleSubmit = this._handleSubmit.bind(this)
  }


  _handleSubmit(e) {
    e.preventDefault()
    console.log('hello');
    let poemTitle = this.refs.titleP.value;
    let poemBody = this.refs.poemBody.value;
    let profPic = this.state.profile.picture
    let userEmail = this.state.profile.email
    console.log(profPic);
    console.log(poemTitle);
    console.log(poemBody);
    console.log(userEmail);
    axios.post('https://guarded-lowlands-63333.herokuapp.com/poems', {
      poem: {
        title: poemTitle,
        poem: poemBody,
        public: false,
        profile_picture: profPic,
        email:userEmail
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
        <div className="Compose">
          <div className="activePoemCompose">
            <form onSubmit={this._handleSubmit}>
               <input className="titleArea" type="text" ref="titleP" placeholder="title" /><br />
               <textarea rows="20" cols="60" ref="poemBody" placeholder="Place Your Poem Here"/><br />
               {/* <input type="checkbox" ref="public" onCheck={this._makePublic} />Public<br /> */}
               <input type="submit" className="buttonForm" />
            </form>
           </div>
          <div className="wordReferenceList">
            <Thesaurus />
            <Dictionary />
            <Rhyme />
          </div>
        </div>
      )
    }

  }
}

export default Home;
