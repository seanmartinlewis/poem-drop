import React, {Component} from 'react';
import './App.css';
// import {Link, IndexLink, hashHistory} from 'react-router';
import axios from 'axios';
// import AuthService from './utils/AuthService';
import Poem from './Poem';
// import ActivePoem from './ActivePoem';
import Modal from 'boron/OutlineModal';

class Collection extends Component {
  constructor(props){
    super(props);

    this.state = {
      poems: [],
      mainPoem: {
        id: 0,
        title: 'Poem Collection',
        poem: 'Click on poem a poem Title to view and edit',
        public: false,
        profile_picture: '',
        email: '',
      },
    }

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this._loadThisPoem = this._loadThisPoem.bind(this);
    this._handleSubmitPut = this._handleSubmitPut.bind(this);
    this._deleteThisPoem = this._deleteThisPoem.bind(this);
    this._toggleCheckbox = this._toggleCheckbox.bind(this);
    this._hideModal = this._hideModal.bind(this)
    this._showModal = this._showModal.bind(this)
  }

  _hideModal(){
    this.refs.modal.hide();
  }

  _showModal(){
    this.refs.modal.show();
  }

  componentDidMount(){
  this._loadPoems()
  }

  _toggleCheckbox(){
    let newPoem = Object.assign(
      {},
      this.state.mainPoem,
      { public: !this.state.mainPoem.public }
    )
    this.setState({mainPoem: newPoem});
  }

  _deleteThisPoem(e){
    e.preventDefault()
    axios.delete('https://guarded-lowlands-63333.herokuapp.com/poems/' + this.state.mainPoem.id, {
      headers: {
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(response => {
      this._loadPoems()
      this.setState({
        mainPoem: {
          id: 0,
          title: 'Poem Collection',
          poem: 'Click on poem to view and edit'
        }
      })
      this._hideModal();
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
    axios.get('https://guarded-lowlands-63333.herokuapp.com/poems', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${this.props.auth.getToken()}`
      }
    }).then(data => {
      let newPoems = data.data;
      this.setState({
        poems: newPoems
      })
    })
  }

  _handleSubmitPut(e) {
    e.preventDefault()
    let poemTitle = this.refs.titleP.value;
    let poemBody = this.refs.poemBody.value;
    let poemPublic = this.state.mainPoem.public;
    axios.put('https://guarded-lowlands-63333.herokuapp.com/poems/' + this.state.mainPoem.id, {
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
          <div className="activePoem">
            <form onSubmit={this._handleSubmitPut}>
               <input className="titleArea" type="text" ref="titleP" placeholder="title" value={this.state.mainPoem.title} onChange={this.handleChangeTitle} /><br />
               <textarea rows="20" cols="60" ref="poemBody" placeholder="Place Your Poem Here" value={this.state.mainPoem.poem} onChange={this.handleChangeText}/><br />
               <input type="checkbox" ref="public" checked={this.state.mainPoem.public} onChange={this._toggleCheckbox}/> <span className="publish">publish</span><br />
               <input type="submit" value="Save Changes" className="buttonForm" />
               <button className="buttonForm" onClick={this._showModal}>Delete Poem</button>
             </form>
          </div>

          <Modal ref="modal" className="modal">
            <div className="modalInfo">
              <h2>Once you click delete, There is NO RETURN. Your poem will be gone FOREVER </h2>
            </div>
            <div className="modalButtons">
              <button className="mod" onClick={this._hideModal}>RETURN TO POEM</button>
              <button className="mod" onClick={this._deleteThisPoem}>DELETE FOREVER</button>
            </div>
          </Modal>

          <div className="poemList">
          {this.state.poems.map((poem, i) => {
            return <Poem loadPoem={this._loadThisPoem} key={i} poem={poem} />
          })}
        </div>
      </div>
    )
  }
}

export default Collection;
