import React from 'react';
import PropTypes from 'prop-types';
import styles from './GradientFadeIn.module.scss';

const GradientFadeIn = props => {
  const {backgroundStyle,backgroundOpacity}=props || {}

  return (
    <div className={styles.root} style={backgroundStyle}>
      <div className={styles.background_small} style={backgroundOpacity}></div>
    </div>
  );
};

GradientFadeIn.defaultProps = {

};

export default GradientFadeIn;


/*
<div className={styles.gradient_opacity} style={background_style}>
<div className={styles.background_small} style={background_op}></div>
</div> 
*/