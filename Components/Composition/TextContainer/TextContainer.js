import React from "react";
import PropTypes from "prop-types";
import styles from "./TextContainer.module.scss";

const TextContainer = (props) => {
  const { children } = props;

  return <div className={styles.root}>{children}</div>;
};

TextContainer.defaultProps = {};

export default TextContainer;
