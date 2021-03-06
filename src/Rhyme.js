import React, { Component } from 'react';
import axios from 'axios';
// import ActivePoem from './ActivePoem'


 class Rhyme extends Component {
   constructor(props){
     super(props);
     this.state={
       rhymes: []

     }

     this._clearField = this._clearField.bind(this)
     this._findRhyme = this._findRhyme.bind(this)
   }

   _clearField(){
     this.setState({
       rhymes: [],
     })
     this.refs.wordToSearch.value = ""
   }

   _findRhyme(){
     let word = this.refs.wordToSearch.value
     axios.get('https://wordsapiv1.p.mashape.com/words/'+word+'/rhymes', {
       headers: {
         "X-Mashape-Key": "4loqMZNTb3mshGazoor91WBuTL2Lp1v0uV6jsnDf1ZGGgOIfjZ"
       }
     }).then(response => {
       let newRhyme = response.data.rhymes.all
       this.setState({
         rhymes: newRhyme
       })
     })
   }

   render() {

     return (
       <div className="rhyme">
        <h4>rhyme</h4>
         <form onSubmit={this._findRhyme}>
           <input type="text" ref="wordToSearch" placeholder="enter word" />
           <input className="searchButt" type="submit" value="SEARCH"/>
         </form>
         <button className="searchButt" onClick={this._clearField}>CLEAR</button>
          <div className="results">
          {this.state.rhymes.map((rhyme, i) => {
            return <p className="words" key={i}>{rhyme}</p>
          })}
          </div>
       </div>
     );
   }
 }

 export default Rhyme;
