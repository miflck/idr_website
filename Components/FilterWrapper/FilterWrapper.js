import React from "react";
import PropTypes from "prop-types";
import styles from "./FilterWrapper.module.scss";

const FilterWrapper = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

FilterWrapper.defaultProps = {};

export default FilterWrapper;
