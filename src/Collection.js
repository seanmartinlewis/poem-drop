import React, {Component} from 'react';
import './App.css';
// import {Link, IndexLink, hashHistory} from 'react-router';
import axios from 'axios';
// import AuthService from './utils/AuthService';
import Poem from './Poem'

class Collection extends Component {
  constructor(props){
    super(props);

    this.state = {
      poems: []
    }
  }

  componentDidMount(){
  this._loadPoems()
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
       {this.state.poems.map((poem, i) => {
         return <Poem key={i} title={poem.title} poem={poem.poem} />
       })}
      </div>
    )
  }
}

export default Collection;
