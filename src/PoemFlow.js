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
    axios.get('https://guarded-lowlands-63333.herokuapp.com/poems/public').then(data => {
      let poemF = data.data;
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
              <div className="poemDisplay">
                <p className="poemWordsTitle">{poem.title}</p><br />
                {' '}
                <p className="poemWords">{poem.poem}</p>
              </div>
            <div className="author">
              <img src={poem.profile_picture} alt="pic" className="poemFlowPic"/>
              <p className="tags">{poem.email}</p>
            </div>
          </div>
          )
        })}
      </div>
    )
  }
}

export default PoemFlow;
