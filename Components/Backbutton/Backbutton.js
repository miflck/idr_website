import React from "react";
import PropTypes from "prop-types";
import styles from "./Backbutton.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";

const Backbutton = (props) => {
  const router = useRouter();
  // &#8592;
  return (
    <div onClick={() => router.back()} className={styles.root}>
      <Image src="/arrow-left.svg" height={35} width={35} />
    </div>
  );
};

Backbutton.defaultProps = {};

export default Backbutton;
