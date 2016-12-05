import React, { Component } from 'react';

 class Poem extends Component {
   render() {
     return (
       <div className="poem">
         <h3 className="poemTitle">{this.props.title}</h3>
         <p className="poemBody">{this.props.poem}</p>
         {/* <text type="checkbox" src={this.props.public}/> */}
       </div>
     );
   }
 }

 export default Poem;
