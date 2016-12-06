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
        id: 0,
        title: 'Click',
        poem: 'On poem to view and edit'
      }
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this._loadThisPoem = this._loadThisPoem.bind(this);
    this._handleSubmitPut = this._handleSubmitPut.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.poems === this.state.poems) {
  //     return false
  //   } else {
  //     console.log('shouldComponentUpdate');
  //     return true;
  //   }
  // }

  componentDidMount(){
  this._loadPoems()
  }


  handleChangeTitle(event) {
    let newPoem = Object.assign(
      {},
      this.state.mainPoem,
      { title:event.target.value }
    )
    this.setState({mainPoem: newPoem});
  }

  handleChangeText(event) {
    let newPoem = Object.assign(
      {},
      this.state.mainPoem,
      { poem: event.target.value }
    )
    this.setState({mainPoem: newPoem});
  }


  _loadThisPoem(thisPoem){
    console.log('poem id', thisPoem.id);
    this.setState({
      mainPoem: {
        id: thisPoem.id,
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
      this.setState({
        poems: newPoems
      })
    })
  }

  _handleSubmitPut(e) {
    e.preventDefault()
    console.log('update');
    let poemTitle = this.refs.titleP.value;
    let poemBody = this.refs.poemBody.value;
    console.log(poemTitle);
    console.log(poemBody);
    console.log('id', this.state.mainPoem.id);
    axios.put('http://localhost:3000/poems/' + this.state.mainPoem.id, {
      poem: {
        title: poemTitle,
        poem: poemBody,
        public: false
      }
    }, {
      headers: {
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(response => {
      this._loadPoems()
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
         <form onSubmit={this._handleSubmitPut}>
            <input type="text" ref="titleP" placeholder="title" value={this.state.mainPoem.title} onChange={this.handleChangeTitle} /><br />
            <textarea rows="20" cols="60" ref="poemBody" placeholder="Place Your Poem Here" value={this.state.mainPoem.poem} onChange={this.handleChangeText}/><br />
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
