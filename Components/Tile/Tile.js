import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tile.module.scss';

const Tile = ({ children }) => {

  return  <div className={`${styles.root}`}>
            {children}
          </div>
};

Tile.defaultProps = {

};

export default Tile;