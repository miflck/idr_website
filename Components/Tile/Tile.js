import React from "react";
import PropTypes from "prop-types";
import styles from "./Tile.module.scss";

const Tile = ({ children, id }) => {
  return (
    <div className={`${styles.root}`} key={id}>
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
};

Tile.defaultProps = {};

export default Tile;
