import React, {Component} from 'react';
import './App.css';
// import {Link, IndexLink, hashHistory} from 'react-router';
import axios from 'axios';
// import AuthService from './utils/AuthService';
import Poem from './Poem';
// import ActivePoem from './ActivePoem';

class Collection extends Component {
  constructor(props){
    super(props);

    this.state = {
      poems: [],
      mainPoem: {
        title: 'Click',
        poem: 'On poem to view and edit'
      }
    }

    this._loadThisPoem = this._loadThisPoem.bind(this)
  }

  componentDidMount(){
  this._loadPoems()
  }

  _loadThisPoem(thisPoem){
    console.log('hello', thisPoem);
    this.setState({
      mainPoem: {
        title: thisPoem.title,
        poem: thisPoem.poem
      }
    })
  }

  _loadPoems() {
    console.log('loading poems');
    axios.get('http://localhost:3000/poems', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(data => {
      let newPoems = data.data;
      console.log(newPoems);
      // let poems = this.state.poems
      // poems.push(poem)
      this.setState({
        poems: newPoems
      })
    })
  }

  render(){

    return(
      <div className="Collection">
      <div className="poemList">
        {this.state.poems.map((poem, i) => {
          return <Poem loadPoem={this._loadThisPoem} key={i} poem={poem} />
        })}
      </div>
       <div className="activePoem">
       <div className="home">
         <form onSubmit={this._handleSubmit}>
            <input type="text" ref="titleP" placeholder="title" value={this.state.mainPoem.title} /><br />
            <textarea rows="20" cols="60" ref="poemBody" placeholder="Place Your Poem Here" value={this.state.mainPoem.poem}/><br />
            <input type="checkbox" ref="public" />Public<br />
            <input type="submit" value="Save Changes" />
          </form>
       </div>
       </div>
      </div>
    )
  }
}

export default Collection;
