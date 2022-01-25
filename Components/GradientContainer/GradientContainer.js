import React from 'react';
import PropTypes from 'prop-types';
import styles from './GradientContainer.module.scss';

const GradientContainer = props => {
  const {children,backgroundStyle}=props || {}
  return (
    <div className={styles.root}>
      <div className={styles.gradientOverlay} style={backgroundStyle}></div>
        {children}
    </div>
  );
};
GradientContainer.defaultProps = {
};
export default GradientContainer;
