import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import styles from "./list.module.scss";

import Link from "next/link";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";
import Tile from "../Tile/Tile";

import GradientContainer from "../GradientContainer/GradientContainer";

import {
  getColorArray,
  getGradientBackgroundStyle,
  makeGradient,
} from "../../lib";
import { makeGradientFromArray } from "../../lib/helpers";
import { ImageElement } from "../Composition";
import { ResponsiveImage } from "../Composition";
import { ElementTitle } from "../Composition";

const ListItemTeam = (props) => {
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const [showHoverGradient, setHoverGradient] = useState(false);

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

  const handleShowGradient = (val) => {};

  let href = `/team`;
  if (props.slug != "") {
    href += `/${props.slug}`;
  }

  // get array of Ids of tags for handleHover
  const researchFieldIdArray = props.forschungsfeld.reduce((acc, it) => {
    acc.push(it.id);
    return acc;
  }, []);

  // get Array of colors from all tags
  const colorArray = getColorArray(props.forschungsfeld);
  //  const gradient_highlight=makeGradient(colorArray[0],colorArray[1],"to left");
  //colorArray[1]="#FF0000";
  if (colorArray.length < 1) {
    colorArray[0] = "#000000";
    colorArray[1] = "#000000";
  }
  if (colorArray.length < 2) {
    colorArray[1] = "#FFFFFF";
  }

  // const gradient_highlight=makeGradient(colorArray[0],colorArray[1],"to left");
  const gradient_highlight = makeGradientFromArray(colorArray, "to right");
  const gradient_normal = `linear-gradient(to right,"white"})`;

  const animationOut = `${styles.fadeOut} .9s ease`;
  const animationIn = ` ${styles.fadeIn} 0.5s ease`;

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

  const gradient_test = makeGradient(
    colorArray[0] + "80",
    "rgba(255,255,255,0)",
    "to bottom"
  );
  let background_style_test = getGradientBackgroundStyle(
    gradient_test,
    animationOut,
    0
  );
  if (props.showGradient || showHoverGradient) {
    background_style_test = getGradientBackgroundStyle(
      gradient_test,
      animationIn,
      1
    );

    // background_style_test["mix-blend-mode"]="multiply"
    background_style_test["zIndex"] = "100";
  }

  // props.forschungsfeld = [...props.funktion, ...props.forschungsfeld];
  return (
    <Tile key={props.id} id={props.id}>
      <div
        className={` ${styles.wrapper} ${
          showHoverGradient ? styles.highlight : ""
        }`}
        onMouseEnter={() => handleHover(true)}
        onTouchStart={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
        onTouchEnd={() => handleHover(false)}
        onTouchCancel={() => handleHover(false)}

        //onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}
      >
        <GradientContainer backgroundStyle={background_style}>
          <div className={`${styles.menschwrapper}`}>
            <Link href={href}>
              <span>
                <div className={styles.portraitWrapper}>
                  <GradientContainer
                    style={{ zIndex: 100 }}
                    // backgroundStyle={background_style_test}
                  >
                    {/**  <ImageElement src={props.portrait.url}  alt={props.portrait.alt} focalPoint={props.portrait.focalPoint} responsiveImage={props.portrait.responsiveImage}></ImageElement>*/}
                    {/**Check if portrait even exists */}
                    {typeof props.portrait === "object" &&
                      props.portrait !== null && (
                        <ResponsiveImage
                          responsiveImage={props.portrait.responsiveImage}
                        ></ResponsiveImage>
                      )}
                  </GradientContainer>
                </div>
                {/* 
              <img 
                src={props.portrait.url}
                src={props.portrait.url} 
                alt={props.portrait.alt} 
              />
*/}

                <ElementTitle highlight={showHoverGradient}>
                  {props.name}
                </ElementTitle>
              </span>
            </Link>

            <ForschungsfeldElement
              forschungsfeld={props.forschungsfeld.concat(props.funktion)}
              showHoverGradient={showHoverGradient}
            />
          </div>
        </GradientContainer>
      </div>
    </Tile>
  );
};

export default ListItemTeam;
