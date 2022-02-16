import React from 'react';
import PropTypes from 'prop-types';
import styles from './TileGrid.module.scss';

const TileGrid = ({ children }) => {
  return (
    <div className={styles.root}>
        {children}
    </div>
  );
};

TileGrid.defaultProps = {

};

export default TileGrid;

