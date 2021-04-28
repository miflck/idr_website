import React from 'react';

// import styles from './slices.module.scss';

//Einzel Bild section slice component

const Einzelbild = ({ slice }) => {
  return (
	<div className={styles.image_wrapper}>
	  {/* <img className={`${styles.einzelbild} `}
            src={slice.primary.image.url}
            alt={slice.primary.image.alt}
      /> */}
	</div>	
  );
};
export default Einzelbild;
