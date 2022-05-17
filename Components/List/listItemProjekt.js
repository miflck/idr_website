import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import styles from "./list.module.scss";
import Link from "next/link";
import Container from "../../Components/Container/container";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";
import {
  getColorArray,
  getGradientBackgroundStyle,
  makeGradientFromArray,
} from "../../lib";

const ListItemProjekt = (props) => {
  const globalState = useContext(AppContext);
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

  // get link
  let href = `/projekte`;
  if (props.slug != "") {
    href += `/${props.slug}`;
  }
  const enddatum = new Date(props.enddatum).toLocaleString([], {
    year: "numeric",
  });
  const startdatum = new Date(props.startdatum).toLocaleString([], {
    year: "numeric",
  });

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

  //  const intersection = state.hoveredElements.filter(item1 => props.forschungsfeld.some(item2 => item1.titel.normalize()===item2.titel.normalize()))
  //if(state.showGradient || showHoverGradient || props.filter.length > 0 || intersection.lenght > 0){
  // not sure if listItem should check state.activeFilters or the parent component?

  //     if(state.showGradient || showHoverGradient || state.activeFilters.length > 0 ){
  //background_style=getGradientBackgroundStyle(gradient_highlight,animationIn,1)
  // }

  return (
    //hover is not working properly on touch devices, so there is now highlight
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
      <div className={styles.gradientContainer} style={background_style}></div>

      <Container>
        <div className={styles.content}>
          <div className={styles.datum}>
            {startdatum} – {enddatum}
          </div>
          <Link href={href} as={href}>
            <div className={styles.titel}>{props.titel}</div>
          </Link>
          <ForschungsfeldElement
            {...props}
            showHoverGradient={showHoverGradient}
          />
        </div>
      </Container>
    </div>
  );
};

export default ListItemProjekt;
