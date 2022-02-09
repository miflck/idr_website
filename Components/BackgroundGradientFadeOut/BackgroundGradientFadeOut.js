import React from 'react';
import PropTypes from 'prop-types';
import styles from './BackgroundGradientFadeOut.module.scss';

const BackgroundGradientFadeOut = props => {
  const {backgroundStyle}=props || {}

  return (
    <div className={styles.root} style={backgroundStyle}>
    </div>
  );
};

BackgroundGradientFadeOut.defaultProps = {

};

export default BackgroundGradientFadeOut;