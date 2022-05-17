import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import styles from "./list.module.scss";
import Link from "next/link";
import Container from "../../Components/Container/container";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";
// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  getColorArray,
  getGradientBackgroundStyle,
  makeGradientFromArray,
} from "../../lib";

const ListItemVeranstaltung = (props) => {
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;
  const { datum } = props;
  // const { t } = useTranslation('common')

  const [showHoverGradient, setHoverGradient] = useState();
  // neu

  const handleHover = (isHover) => {
    if (isHover) {
      dispatch({
        type: ACTIONS.ADD_HOVER_FILTER,
        payload: { element: researchFieldIdArray },
      });
      setHoverGradient(true);
    } else {
      dispatch({
        type: ACTIONS.REMOVE_HOVER_FILTER,
        payload: { element: researchFieldIdArray },
      });
      setHoverGradient(false);
    }
  };

  let href = `/veranstaltungen`;
  if (props.slug != "") {
    href += `/${props.slug}`;
  }

  const now = new Date();
  let date;
  if (new Date(datum) < now) {
    date = new Date(datum).toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    date = new Date(datum).toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // get array of Ids of tags for handleHover
  const researchFieldIdArray = props.forschungsfeld.reduce((acc, it) => {
    acc.push(it.id);
    return acc;
  }, []);

  const colorArray = getColorArray(props.forschungsfeld);
  const gradient_highlight = makeGradientFromArray(colorArray, "to right");
  const gradient_normal = `linear-gradient(to right,"white"})`;
  const animationOut = `${styles.fadeOut} 1.2s ease`;
  const animationIn = ` ${styles.fadeIn} 0.5s ease`;

  let background_style = getGradientBackgroundStyle(
    gradient_normal,
    animationOut,
    0
  );

  if (props.showGradient || showHoverGradient) {
    background_style = getGradientBackgroundStyle(
      gradient_highlight,
      animationIn,
      1
    );
  }

  return (
    <>
      <div
        className={`${styles.wrapper} ${
          showHoverGradient ? styles.highlight : ""
        }`}
        key={props.id}
        onMouseEnter={() => handleHover(true)}
        onTouchStart={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onTouchEnd={() => handleHover(false)}
        onTouchCancel={() => handleHover(false)}
      >
        <div
          className={styles.gradientContainer}
          style={background_style}
        ></div>

        <Container>
          <div className={styles.content}>
            <div className={styles.datum}>{`${date} ${
              new Date(datum) < now ? "" : "UHR"
            }`}</div>

            <Link href={href} as={href}>
              <div className={styles.linkwrapper}>
                <div className={styles.titel}>{props.titel}</div>
                <div className={styles.referentIn}>{props.referentIn}</div>
              </div>
            </Link>
            <ForschungsfeldElement
              {...props}
              showHoverGradient={showHoverGradient}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default ListItemVeranstaltung;
