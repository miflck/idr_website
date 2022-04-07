import React from "react";
import PropTypes from "prop-types";
import styles from "./HeaderWrapper.module.scss";

const HeaderWrapper = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

HeaderWrapper.defaultProps = {};

export default HeaderWrapper;
