import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageElement.module.scss';
import Image from 'next/image'

const ImageElement = ({src,alt,height}) => {
  return (
    <div className={styles.root}>
    {/*<img src={src} alt={alt}/> */}
       <Image
      src={src}
      alt={alt}
      width={'100w'}
      height={'80'}
      layout='responsive'
      objectFit="cover"
    />
    </div>
  );
};

ImageElement.defaultProps = {

};

export default ImageElement;