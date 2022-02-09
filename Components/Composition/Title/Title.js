import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.module.scss';

const Title = ({title}) => {
  return (
    <div className={styles.root}>
         <h1>{title}</h1>
    </div>
  );
};

Title.defaultProps = {

};

export default Title;