import React, { Component } from 'react'
import axios from 'axios';
import DocItems from './DocumentItems';
export class Documents extends Component {
   state = {
       docs: [],
       isLoaded: false
   }
 componentDidMount () {
   axios.get('https://mvfstagingsite.wpengine.com//wp-json/wp/v2/dock/?id=80851/')
       .then(res => this.setState({
           docs: res.data,
           isLoaded: true
       }))
       .catch(err => console.log(err))
   }
   render() {
    const {docs, isLoaded} = this.state;
       return (
           <div>
               {docs.map(doc =>
               <DocItems key={doc.id} doc={doc}/>
               )}
           </div>
       )
   }
}
export default Documents