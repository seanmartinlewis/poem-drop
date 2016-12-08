import React, {Component} from 'react';
import './App.css';
// import {Link} from 'react-router';
import axios from 'axios';


class PoemFlow extends Component {
  constructor(props){
    super(props)

    this.state = {
      poems: []
    }

    this._loadPoemFlow = this._loadPoemFlow.bind(this);
  }

  componentDidMount(){
    this._loadPoemFlow();
  }

  _loadPoemFlow(){
    console.log('loading poem flow');
    axios.get('https://guarded-lowlands-63333.herokuapp.com/poems/public').then(data => {
      let poemF = data.data;
      console.log(poemF);
      this.setState({
        poems: poemF
      })
    })
  }


  render(){
    return(
      <div className="poemFlow">
        {this.state.poems.map((poem, i) => {
          return(
          <div key={i}>
            <h3>{poem.title}</h3>
            <p>{poem.poem}</p>
            <p>{poem.user_id}</p>
            <img src={poem.profile_picture} alt="pic" className="profilePic"/>
            <p>{poem.email}</p>
          </div>
          )
        })}
      </div>
    )
  }
}

export default PoemFlow;
