import React from "react";
import PropTypes from "prop-types";
import styles from "./ElementTitle.module.scss";

const ElementTitle = (props) => {
  return (
    <div
      className={` ${styles.root} ${props.highlight ? styles.highlight : ""}`}
    >
      {props.children}
    </div>
  );
};

ElementTitle.defaultProps = {};

export default ElementTitle;
