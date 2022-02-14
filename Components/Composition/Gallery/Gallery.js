import React from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.scss';
import { ImageElement } from '..'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Gallery = props => {
  const {data}=props;
 

  return (
    <div className={styles.root}>
       <Carousel>
    {data.map((element)=>{
      console.log(element)
      return(
        <div>
          
       {/* <ImageElement key={element.id} src={element.url} />*/}

        <img src={element.url} alt="image1"/>

        </div>
      )
    })}
</Carousel>
</div>
  );
};

Gallery.defaultProps = {

};

export default Gallery;


