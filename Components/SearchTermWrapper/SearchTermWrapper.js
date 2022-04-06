import React from "react";
import PropTypes from "prop-types";
import styles from "./SearchTermWrapper.module.scss";
import Container from "../Container/container";

const SearchTermWrapper = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <Container>{children}</Container>
    </div>
  );
};

SearchTermWrapper.defaultProps = {};

export default SearchTermWrapper;
