import React from "react";
import PropTypes from "prop-types";
import styles from "./Listtitle.module.scss";

const Listtitle = ({ title, subtitle, toptitle }) => {
  return (
    <div className={styles.root}>
      {toptitle != "" && <h2>{toptitle}</h2>}

      <h1>{title}</h1>
      {subtitle != "" && <h2>{subtitle}</h2>}
    </div>
  );
};

Listtitle.defaultProps = {};

export default Listtitle;
