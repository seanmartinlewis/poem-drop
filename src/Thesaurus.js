import React, { Component } from 'react';
import axios from 'axios';
// import ActivePoem from './ActivePoem'


 class Thesaurus extends Component {
   constructor(props){
     super(props);
     this.state={
       nouns: [],
       verbs: []
     }

     this._clearField = this._clearField.bind(this)
     this._findSynonyms = this._findSynonyms.bind(this)
   }

   _clearField(){
     this.setState({
       nouns: [],
       verbs: []
     })
     this.refs.wordToFind.value = ""
   }

   _findSynonyms(){
     let word = this.refs.wordToFind.value
     axios.get('http://words.bighugelabs.com/api/2/7194d494c196c6f2726d9651900f8e10/'+word+'/json').then(response => {
       let synonymsNoun = response.data.noun.syn
       let synonymsVerb = response.data.verb.syn
       this.setState({
         nouns: synonymsNoun,
         verbs: synonymsVerb
       })
     })
   }

   render() {

     return (
       <div className="thesaurus">
        <h4>thesaurus</h4>
         <form onSubmit={this._findSynonyms}>
           <input type="text" ref="wordToFind" placeholder="enter word" />
           <input type="submit" className="searchButt" value="SEARCH"/>
         </form>
         <button className="searchButt" onClick={this._clearField}>CLEAR</button>
         <div>
           <div className="results">
             {this.state.nouns.map((noun, i) => {
               return <p className="words" key={i}>n:  {noun}</p>
             })}
           </div>
           <div className="results">
             {this.state.verbs.map((verb, i) => {
               return <p className="words" key={i}>v:  {verb}</p>
             })}
           </div>
         </div>
       </div>
     );
   }
 }

 export default Thesaurus;
