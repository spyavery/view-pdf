import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
export class DocPDF extends Component {
   state = {
       imgUrl: '',
       author: '',
       isLoaded: false
   }
   static propTypes = {
       doc: PropTypes.object.isRequired
   }
   componentDidMount () {
       const {acf, author} = this.props.doc;
       const getImageUrl = axios.get(`https://mvfstagingsite.wpengine.com//wp-json/wp/v2/media/${acf.upload_pdf}`);
       const getAuthor = axios.get(`https://mvfstagingsite.wpengine.com//wp-json/wp/v2/users/${author}`);
      
       Promise.all([getImageUrl, getAuthor]).then(res => {
           console.log(res);
           this.setState({
            //    imgUrl: res[0].data.media_details.sizes.full.source_url,
               imgUrl: res[0].data.guid.rendered,
               author: res[1].data.name,
               isLoaded: true
           });
       });
    }
 
   render() {
       const { title, acf, excerpt } = this.props.doc;
       const {author, imgUrl, isLoaded} = this.state;
       return (
           <div>
              <h2>{title.rendered}</h2>
              <h2>{acf.subtitle}</h2>
              <p>{imgUrl}</p>
              {/* <img src={imgUrl} alt={title.rendered}/> */}
              <strong>{author}</strong><br/>
              <div dangerouslySetInnerHTML={{__html: excerpt.rendered}}></div>
           </div>
       )
   }
}
export default DocPDF