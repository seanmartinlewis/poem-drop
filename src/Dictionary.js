import React, { Component } from 'react';
import axios from 'axios';
// import ActivePoem from './ActivePoem'


 class Dictionary extends Component {
   constructor(props){
     super(props);
     this.state={
       definitions: []

     }

    this._clearField = this._clearField.bind(this)
     this._findDefinition = this._findDefinition.bind(this)
   }

   _clearField(){
     this.setState({
       definitions: [],
     })
     this.refs.wordToSearch.value = ""
   }

   _findDefinition(){
     let word = this.refs.wordToSearch.value
     axios.get('https://wordsapiv1.p.mashape.com/words/'+word+'/definitions', {
       headers: {
         "X-Mashape-Key": "4loqMZNTb3mshGazoor91WBuTL2Lp1v0uV6jsnDf1ZGGgOIfjZ"
       }
     }).then(response => {
       let newDefinition = response.data.definitions
       this.setState({
         definitions: newDefinition
       })
     })
   }

   render() {

     return (
       <div className="dictionary">
        <h4>dictionary</h4>
         <form onSubmit={this._findDefinition}>
           <input type="text" ref="wordToSearch" placeholder="enter word" />
           <input className="searchButt" type="submit" value="SEARCH"/>
         </form>
          <button className="searchButt" onClick={this._clearField}>CLEAR</button>
          <div>
          {this.state.definitions.map((definition, i) => {
            return(
            <div className="results" key={i}>
              <p className="results">{definition.partOfSpeech}</p>
              <h3 className="results">{definition.definition}</h3>
            </div>
            )
          })}
          </div>
       </div>
     );
   }
 }

 export default Dictionary;
