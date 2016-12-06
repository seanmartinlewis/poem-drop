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


     this._findSynonyms = this._findSynonyms.bind(this)
   }

   _findSynonyms(){
     console.log('finding', this.refs.wordToFind.value);
     let word = this.refs.wordToFind.value
     axios.get('http://words.bighugelabs.com/api/2/7194d494c196c6f2726d9651900f8e10/'+word+'/json').then(response => {
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
        <h4>Thesaurus</h4>
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

 export default Thesaurus;
