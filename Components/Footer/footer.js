import styles from "./footer.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import i18n from "../../node_modules/i18next";

import { ChromePicker } from "react-color";
import React, { useState } from "react";
import { ImageElementContain } from "../Composition";

const Footer = (props) => {
  const [openmain, setColorPickerOpenMain] = useState(false);
  const handleOnClickMain = (openmain) => {
    setColorPickerOpenMain((openmain) => !openmain);
  };
  const [opensecond, setColorPickerOpenSecond] = useState(false);
  const handleOnClickSecond = (opensecond) => {
    setColorPickerOpenSecond((opensecond) => !opensecond);
  };

  const router = useRouter();

  let LanguageButtons;
  if (router.locale.includes("en")) {
    LanguageButtons = (
      <>
        <Link href={router.asPath} locale="de">
          <a>de</a>
        </Link>
        <Link href={router.asPath} locale="en">
          <a className={styles.activelanguage}>en</a>
        </Link>
      </>
    );
  } else {
    LanguageButtons = (
      <>
        <Link href={router.asPath} locale="de">
          <a className={styles.activelanguage}>de</a>
        </Link>
        <Link href={router.asPath} locale="en">
          <a>en</a>
        </Link>
      </>
    );
  }

  return (
    <div className={styles.footerwrapper}>
      <div className={styles.logoContainer}>
        <a href="https://www.bfh.ch/de/" className={styles.outlink} target="_blank" rel="noopener noreferrer">
          <svg className={styles.logo} viewBox="0 0 61.6 96" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.9,47.5c0,0-0.3-0.1-0.3-0.4c0-0.2,0.1-0.3,0.2-0.4c7-4.4,11.3-12.4,11.3-21.7c0-13.8-11.2-25-25-25H3.5 C1.6,0,0,1.6,0,3.5v89C0,94.4,1.6,96,3.5,96l33.1,0c13.8,0,25-11.2,25-25C61.6,60.2,55.9,51,46.9,47.5z M33.8,78.2 c0,0.4-0.4,0.8-0.8,0.8h-1.3c-0.4,0-0.8-0.4-0.8-0.8v-8.6h-7.8v8.6c0,0.4-0.4,0.8-0.8,0.8H21c-0.4,0-0.8-0.4-0.8-0.8V58.1 c0-0.4,0.4-0.8,0.8-0.8h1.3c0.4,0,0.8,0.4,0.8,0.8V67h7.8v-8.9c0-0.4,0.4-0.8,0.8-0.8H33c0.4,0,0.8,0.4,0.8,0.8V78.2z M33.8,18.6 c0,0.4-0.4,0.8-0.8,0.8H23v7h8.5c0.4,0,0.8,0.4,0.8,0.8v0.9c0,0.4-0.4,0.8-0.8,0.8H23v8.9c0,0.4-0.4,0.8-0.8,0.8h-1.3 c-0.4,0-0.8-0.4-0.8-0.8V17.7c0-0.4,0.4-0.8,0.8-0.8H33c0.4,0,0.8,0.4,0.8,0.8V18.6z" />
            <path
              className={styles.accent}
              d="M33,57.3h-1.3c-0.4,0-0.8,0.4-0.8,0.8V67h-7.8v-8.9c0-0.4-0.4-0.8-0.8-0.8H21c-0.4,0-0.8,0.4-0.8,0.8v20.1 c0,0.4,0.4,0.8,0.8,0.8h1.3c0.4,0,0.8-0.4,0.8-0.8v-8.6h7.8v8.6c0,0.4,0.4,0.8,0.8,0.8H33c0.4,0,0.8-0.4,0.8-0.8V58.1 C33.8,57.7,33.4,57.3,33,57.3z"
            />
            <path
              className={styles.accent}
              d="M33,16.9H20.9c-0.4,0-0.8,0.4-0.8,0.8v20.1c0,0.4,0.4,0.8,0.8,0.8h1.3c0.4,0,0.8-0.4,0.8-0.8v-8.9h8.5 c0.4,0,0.8-0.4,0.8-0.8v-0.9c0-0.4-0.4-0.8-0.8-0.8H23v-7h10c0.4,0,0.8-0.4,0.8-0.8v-0.9C33.8,17.3,33.4,16.9,33,16.9z"
            />
          </svg>
          <div className={styles.threelines}> © Berner Fachhochschule 2024</div>
        </a>
      </div>{" "}
      <div className={styles.logoContainer}>
        <a href="https://www.bfh.ch/de/" className={styles.outlink} target="_blank" rel="noopener noreferrer">
          <svg className={styles.logo} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 235.6 68">
            <g id="Markenzeichen">
              <polygon fill="currentColor" points="46,18.8 10.5,18.8 10.5,0 0,0 0,28.3 56.6,28.3 56.6,0 46,0" />
              <path
                fill="currentColor"
                d="M235.6,14.2C235.6,5.6,230,0,220.1,0h-42.9v28.4h42.9C229.9,28.3,235.6,22.8,235.6,14.2z M187.7,18.8V9.6h31.9c3.2,0,5.5,1.5,5.5,4.6s-2.2,4.6-5.5,4.6L187.7,18.8L187.7,18.8z"
              />
              <polygon fill="currentColor" points="0,68 10.5,68 10.5,49.3 46,49.3 46,68 56.6,68 56.6,39.7 0,39.7" />
              <polygon fill="currentColor" points="90.6,39.7 90.6,68 101.2,68 101.2,50 136.1,68 157.3,68 101.2,39.7" />
              <path
                fill="currentColor"
                d="M220.1,39.7h-42.9V68h42.9c9.9,0,15.5-5.6,15.5-14.2S229.9,39.7,220.1,39.7z M219.6,58.5h-31.9v-9.2h31.9c3.2,0,5.5,1.5,5.5,4.6C225.1,57,222.8,58.5,219.6,58.5z"
              />
              <polygon fill="currentColor" points="101.2,18 101.2,0 90.6,0 90.6,28.3 101.2,28.3 157.3,0 136.1,0" />
            </g>
          </svg>

          <div className={styles.threelines}>
            <span>Hochschule der Künste Bern</span>
            <span>Departement der Berner</span>
            <span>Fachhochschule hkb.bfh.ch</span>
          </div>
        </a>
      </div>
      {/* <Link href="/impressum">
        <div className={styles.impressum}>Impressum</div>
      </Link> */}
    </div>
  );
};

export default Footer;
