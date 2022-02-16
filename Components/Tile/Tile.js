import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tile.module.scss';

const Tile = ({ children }) => {

  return  <div className={`${styles.root}`}>
    <div className={`${styles.content}`}>
            {children}
            </div>
          </div>
};

Tile.defaultProps = {

};

export default Tile;