import React from 'react';
import PropTypes from 'prop-types';
import styles from './McWrapper.module.scss';

const McWrapper = props => {
 const {children}=props;
  return (
    <div className={`${styles.root}`}>
          {children}
    </div>
  );
};

McWrapper.defaultProps = {

};

export default McWrapper;



