import React, { Component } from 'react';
// import ActivePoem from './ActivePoem'
 class Poem extends Component {

   render() {

     return (
       <div className="poem" onClick={(e) => this.props.loadPoem(this.props.poem)}>
         <h3 className="poemTitle">{this.props.poem.title}</h3>
         <p className="poemBody">{this.props.poem}</p>
       </div>
     );
   }
 }

 export default Poem;
