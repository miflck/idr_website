import React from "react";
import PropTypes from "prop-types";
import styles from "./StickyHeaderContainer.module.scss";

const StickyHeaderContainer = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

StickyHeaderContainer.defaultProps = {};

export default StickyHeaderContainer;
