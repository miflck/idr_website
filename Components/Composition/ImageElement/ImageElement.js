import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageElement.module.scss';

const ImageElement = ({src,alt}) => {
  return (
    <div className={styles.root}>
      <img src={src} alt={alt}/>
    </div>
  );
};

ImageElement.defaultProps = {

};

export default ImageElement;