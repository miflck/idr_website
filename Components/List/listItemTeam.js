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
import { ResponsiveImage } from "../Composition";
import { ElementTitle } from "../Composition";

const ListItemTeam = (props) => {
  const globalState = useContext(AppContext);
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
  // if background is black, name must be white…
  let titleColor = "var(--maincolor)";
  if (colorArray[0] == "var(--maincolor)") {
    titleColor = "var(--secondcolor)";
  }
  const actualTitleColor = props.showGradient
    ? { color: titleColor }
    : { color: "inherit" };

  // const gradient_highlight=makeGradient(colorArray[0],colorArray[1],"to left");
  const gradient_highlight = makeGradientFromArray(colorArray, "to right");
  const animationOut = `${styles.fadeOut} 1.2s ease`;
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

  const gradient_image = makeGradient(
    colorArray[0] + "80",
    "rgba(255,255,255,0)",
    "to bottom"
  );
  let background_style_image = getGradientBackgroundStyle(
    gradient_image,
    animationOut,
    0
  );
  if (props.showGradient || showHoverGradient) {
    background_style_image = getGradientBackgroundStyle(
      gradient_image,
      animationIn,
      1
    );

    background_style_image["mix-blend-mode"] = "multiply";
    background_style_image["zIndex"] = "100";
  }

  // props.forschungsfeld = [...props.funktion, ...props.forschungsfeld];
  return (
    <Tile key={props.id} id={props.id}>
      <div
        className={` ${styles.wrapper} ${
          showHoverGradient ? styles.highlight : ""
        }`}
        style={actualTitleColor}
        //style={`${showHoverGradient ? { color: "white" } : { color: "blue" }}`}
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
                    // backgroundStyle={background_style_image}
                  >
                    {/**Check if portrait even exists */}
                    {typeof props.portrait === "object" &&
                      props.portrait !== null && (
                        <ResponsiveImage
                          responsiveImage={props.portrait.responsiveImage}
                        ></ResponsiveImage>
                      )}
                  </GradientContainer>
                </div>

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
