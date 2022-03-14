import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import styles from "./list.module.scss";
import Link from "next/link";
import Container from "../../Components/Container/container";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";
// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ListItemVeranstaltung = (props) => {
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

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
  // get array of Ids of tags for handleHover
  const researchFieldIdArray = props.forschungsfeld.reduce((acc, it) => {
    acc.push(it.id);
    return acc;
  }, []);

  // get Array of colors from all tags
  const colorArray = props.forschungsfeld.reduce((acc, it) => {
    acc.push(it.colour.hex);
    return acc;
  }, []);

  let href = `/veranstaltungen`;
  if (props.slug != "") {
    href += `/${props.slug}`;
  }

  const date = new Date(props.datum).toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // factory for gradient background style
  const getGradientBackgroundStyle = (gradient, anim, opac) => {
    return {
      background: gradient,
      opacity: opac,
      animation: anim,
    };
  };
  const gradient_highlight = `linear-gradient(to right, ${colorArray[0]}, ${
    colorArray[1] || "white"
  })`;
  const gradient_normal = `linear-gradient(to right,"white"})`;
  const animationOut = `${styles.fadeOut} .9s ease`;
  const animationIn = ` ${styles.fadeIn} 0.5s ease`;

  let background_style = getGradientBackgroundStyle(
    gradient_normal,
    animationOut,
    0
  );

  const enddatum = new Date(props.enddatum).toLocaleString([], {
    year: "numeric",
  });
  const startdatum = new Date(props.startdatum).toLocaleString([], {
    year: "numeric",
  });

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
            <div className={styles.datum}>{date} Uhr</div>

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
