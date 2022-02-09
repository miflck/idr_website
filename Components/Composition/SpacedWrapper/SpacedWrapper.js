import React from 'react';
import PropTypes from 'prop-types';
import styles from './SpacedWrapper.module.scss';

const SpacedWrapper = props => {
  const {children}=props;
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
};

SpacedWrapper.defaultProps = {

};

export default SpacedWrapper;
