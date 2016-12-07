import React, { Component } from 'react';
import axios from 'axios';
// import ActivePoem from './ActivePoem'


 class Rhyme extends Component {
   constructor(props){
     super(props);
     this.state={
       rhymes: []

     }


     this._findRhyme = this._findRhyme.bind(this)
   }

   _findRhyme(){
     console.log('finding', this.refs.wordToSearch.value);
     let word = this.refs.wordToSearch.value
     axios.get('https://wordsapiv1.p.mashape.com/words/'+word+'/rhymes', {
       headers: {
         "X-Mashape-Key": "4loqMZNTb3mshGazoor91WBuTL2Lp1v0uV6jsnDf1ZGGgOIfjZ"
       }
     }).then(response => {
       let newRhyme = response.data.rhymes.all
       console.log(response.data.rhymes.all);
       this.setState({
         rhymes: newRhyme
       })
     })
   }

   render() {

     return (
       <div className="dictionary">
        <h4>Rhyme</h4>
         <form onSubmit={this._findRhyme}>
           <input type="text" ref="wordToSearch" placeholder="enter word" />
           <input type="submit" value="SEARCH"/>
         </form>
          <div>
          {this.state.rhymes.map((rhyme, i) => {
            return <p key={i}>{rhyme}</p>
          })}
          </div>
       </div>
     );
   }
 }

 export default Rhyme;
