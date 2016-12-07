
import React, { Component } from 'react';
import axios from 'axios';
// import ActivePoem from './ActivePoem'


 class Dictionary extends Component {
   constructor(props){
     super(props);
     this.state={
       type: [],
       definition: []
     }


     this._findSynonyms = this._findSynonyms.bind(this)
   }

   _findSynonyms(){
     console.log('finding', this.refs.wordToFind.value);
     let word = this.refs.wordToFind.value
     axios.get('https://owlbot.info/api/v1/dictionary/owl'+word+'?format=json').then(response => {
       let synonymsNoun = response.data.noun.syn
       let synonymsVerb = response.data.verb.syn
       console.log(synonymsNoun);
       console.log(synonymsVerb);
       this.setState({
         nouns: synonymsNoun,
         verbs: synonymsVerb
       })
     })
   }

   render() {

     return (
       <div className="thesaurus">
        <h4>Dictionary</h4>
         <form onSubmit={this._findSynonyms}>
           <input type="text" ref="wordToFind" placeholder="enter word" />
           <input type="submit" value="SEARCH"/>
         </form>
          <div>
            <h3>Nouns:</h3>
            {this.state.nouns.map((noun, i) => {
              return <p key={i}>{noun}</p>
            })}
          </div>
          <div>
            <h3>Verbs:</h3>
            {this.state.verbs.map((verb, i) => {
              return <p key={i}>{verb}</p>
            })}
          </div>
       </div>
     );
   }
 }

 export default Dictionary;
