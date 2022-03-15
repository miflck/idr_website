import React from "react";
import PropTypes from "prop-types";
import styles from "./Title.module.scss";

const Title = ({ title, subtitle, toptitle }) => {
  return (
    <div className={styles.root}>
      {toptitle != "" && <h2>{toptitle}</h2>}

      <h1>{title}</h1>
      {subtitle != "" && <h2>{subtitle}</h2>}
    </div>
  );
};

Title.defaultProps = {};

export default Title;
