import React from "react";
import PropTypes from "prop-types";
import styles from "./SearchTermWrapper.module.scss";

const SearchTermWrapper = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

SearchTermWrapper.defaultProps = {};

export default SearchTermWrapper;
