import styles from "./list.module.scss";
import Link from "next/link";
import Container from "../Container/container";
import { AppContext, ACTIONS } from "../../context/state";
import React, { useEffect, useContext, useState } from "react";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";
import { PublicationFilter, getForschungsfeldId } from "../../lib/helpers";
import {
  getColorArray,
  getGradientBackgroundStyle,
  makeGradientFromArray,
} from "../../lib";

const ListItemPublikation = (props) => {
  if (props) {
    const globalState = useContext(AppContext);
    const { state } = globalState;
    const { dispatch } = globalState;

    const [showHoverGradient, setHoverGradient] = useState();

    const handleHover = (isHover) => {
      if (isHover) {
        /*  dispatch({
          type: ACTIONS.ADD_HOVER_FILTER,
          payload: { element: researchFieldIdArray }, 
        });*/
        setHoverGradient(true);
      } else {
        /* dispatch({
          type: ACTIONS.REMOVE_HOVER_FILTER,
          payload: { element: researchFieldIdArray },
        });*/
        setHoverGradient(false);
      }
    };

    let filter = [];
    filter.push(PublicationFilter.find((o) => o.term === props.type));

    // get array of Ids of tags for handleHover
    const researchFieldIdArray = props.forschungsfeld.reduce((acc, it) => {
      acc.push(it.id);
      return acc;
    }, []);

    let href = "";
    href += `${props.uri}`;

    const d = props.date.toString();
    const date = new Date(d).toLocaleString([], {
      // month: 'long',
      year: "numeric",
    });

    const colorArray = getColorArray(props.forschungsfeld);

    const gradient_highlight = makeGradientFromArray(colorArray, "to right");
    const animationOut = `${styles.fadeOut} 1.2s ease`;
    const animationIn = ` ${styles.fadeIn} .5s ease`;

    let background_style = getGradientBackgroundStyle(
      gradient_highlight,
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
            <div className={styles.datum}>{date}</div>
            <Link href={href} as={href}>
              <a className={styles.listLinkBlank} target="_blank">
                <div className={styles.titel}>{props.title}</div>
              </a>
            </Link>

            <ForschungsfeldElement
              {...props}
              //forschungsfeld={filter}
              forschungsfeld={props.forschungsfeld}
              showHoverGradient={showHoverGradient}
            />
          </div>
        </Container>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ListItemPublikation;
