import React from 'react';
import PropTypes from 'prop-types';
import styles from './ResponsiveImage.module.scss';
import { Image } from "react-datocms";

const ResponsiveImage = props => {
  const {responsiveImage}=props

  return (
    <div className={styles.root}>
    <Image data={responsiveImage}
    fadeInDuration="50"
    />
    </div>
  );
};

ResponsiveImage.defaultProps = {

};

export default ResponsiveImage;