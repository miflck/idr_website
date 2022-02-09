import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageElement.module.scss';
import Image from 'next/image'

const ImageElement = ({src,alt}) => {
  return (
    <div className={styles.root}>
    <img src={src} alt={alt}/>
      {/* <Image
      src={src}
      alt={alt}
      layout="fill"

    />*/}
    </div>
  );
};

ImageElement.defaultProps = {

};

export default ImageElement;