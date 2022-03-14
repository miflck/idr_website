import React from "react";
import PropTypes from "prop-types";
import styles from "./Backbutton.module.scss";
import { useRouter } from "next/router";

const Backbutton = (props) => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className={styles.root}>
      <div className={styles.center}>&#8592;</div>
    </div>
  );
};

Backbutton.defaultProps = {};

export default Backbutton;
