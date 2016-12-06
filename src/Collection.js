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
        poem: 'On poem to view and edit',
        public: false
      }
    }
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this._loadThisPoem = this._loadThisPoem.bind(this);
    this._handleSubmitPut = this._handleSubmitPut.bind(this);
    this._deleteThisPoem = this._deleteThisPoem.bind(this);
    this._toggleCheckbox = this._toggleCheckbox.bind(this);
  }

  componentDidMount(){
  this._loadPoems()
  }

  _toggleCheckbox(){
    console.log('toggle');
    let newPoem = Object.assign(
      {},
      this.state.mainPoem,
      { public: !this.state.mainPoem.public }
    )
    this.setState({mainPoem: newPoem});
  }

  _deleteThisPoem(e){
    e.preventDefault()
    console.log('delete');
    console.log('id', this.state.mainPoem.id);
    axios.delete('http://localhost:3000/poems/' + this.state.mainPoem.id, {
      headers: {
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(response => {
      this._loadPoems()
      this.setState({
        mainPoem: {
          id: 0,
          title: 'Click',
          poem: 'On poem to view and edit'
        }
      })
    })

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
        poem: thisPoem.poem,
        public: thisPoem.public
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
    let poemPublic = this.state.mainPoem.public;
    console.log(poemTitle);
    console.log(poemBody);
    console.log('poem is public', poemPublic);
    console.log('id', this.state.mainPoem.id);
    axios.put('http://localhost:3000/poems/' + this.state.mainPoem.id, {
      poem: {
        title: poemTitle,
        poem: poemBody,
        public: poemPublic
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
            <input type="checkbox" ref="public" checked={this.state.mainPoem.public} onChange={this._toggleCheckbox}/>Public<br />
            <input type="submit" value="Save Changes" />
            <button onClick={this._deleteThisPoem}>Delete Poem</button>
          </form>
       </div>
       </div>
      </div>
    )
  }
}

export default Collection;
