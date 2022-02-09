import React from 'react';
import PropTypes from 'prop-types';
import styles from './ServiceElement.module.scss';

const ServiceElement = ({title,children}) => {
  return (
    <div className={styles.root}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

ServiceElement.defaultProps = {

};

export default ServiceElement;