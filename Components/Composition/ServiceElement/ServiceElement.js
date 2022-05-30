import React from "react";
import PropTypes from "prop-types";
import styles from "./ServiceElement.module.scss";

const ServiceElement = ({ title, children, style }) => {
  console.log("stsle", style);
  return (
    <div className={styles.root} style={style}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

ServiceElement.defaultProps = {};

export default ServiceElement;
