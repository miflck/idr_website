import React from 'react';
// import ImageGallery from 'react-image-gallery';

// import styles from './slices.module.scss';

/* Bildergalerie section slice component */

const Galerie = ({ slice }) => {
console.log("bildgalerie", slice)
//   let images = [];
//   slice.fields.map((item)=>{ 
//     let element = {};
//     element.original=item.image.url;
//     element.originalAlt=item.image.alt;
//     // element.description=item.caption;
//     images.push(element)
//     })



  return (
	<div className={styles.galeryimage_wrapper}>
        {/* <ImageGallery 
        items={images}
        showThumbnails={false}
        showPlayButton={false}
        showFullscreenButton={false}
        
        >
        </ImageGallery> */}
	</div>	
  );
};
export default Galerie;
