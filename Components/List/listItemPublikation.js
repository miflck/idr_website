import styles from "./list.module.scss";
import Link from "next/link";
import Container from "../Container/container";
import { AppContext, ACTIONS } from "../../context/state";
import React, { useEffect, useContext, useState } from "react";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";
import { PublicationFilter } from "../../lib/helpers";

const ListItemPublikation = (props) => {
  if (props) {
    const globalState = useContext(AppContext);
    const { state } = globalState;
    const { dispatch } = globalState;

    const [showHoverGradient, setHoverGradient] = useState();

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

    let filter = [];
    filter.push(PublicationFilter.find((o) => o.term === props.type));

    // get array of Ids of tags for handleHover
    const researchFieldIdArray = filter.reduce((acc, it) => {
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

    // get Array of colors from all tags
    const colorArray = filter.reduce((acc, it) => {
      acc.push(it.colour.hex);
      return acc;
    }, []);

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
    const animationIn = ` ${styles.fadeIn} 0.2s ease`;

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
                <div className={styles.titel}>{props.title[0].text}</div>
              </a>
            </Link>
            <ForschungsfeldElement
              {...props}
              forschungsfeld={filter}
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
