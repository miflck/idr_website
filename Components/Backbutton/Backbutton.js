import React from "react";
import PropTypes from "prop-types";
import styles from "./Backbutton.module.scss";
import { useRouter } from "next/router";

const Backbutton = (props) => {
  const router = useRouter();

  return (
    <div className={styles.root}>
      <div onClick={() => router.back()}>Zurück</div>
    </div>
  );
};

Backbutton.defaultProps = {};

export default Backbutton;
