import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import styles from "./list.module.scss";
import Link from "next/link";
import { GradientContainer } from "..";
import {
  getColorArray,
  getGradientBackgroundStyle,
  makeGradient,
  makeGradientFromArray,
} from "../../lib";
import { ElementTitle } from "../Composition";
import { ImageElement } from "../Composition";
import { ImageElementContain } from "../Composition";
import Tile from "../Tile/Tile";
import { StructuredText } from "react-datocms";
import { render } from "datocms-structured-text-to-plain-text";

// import Container from '../../Components/Container/container'
import TextElement from "../Composition/TextElement";
import ForschungsfeldElement from "../ForschungsfeldElement/forschungsfeldElement";

const ListItemNews = (props) => {
  const {
    id,
    title,
    forschungsfelder,
    image,
    text,
    link,
    weblink,
    slug,
    teaser,
    date,
    hochformat,
  } = props;
  console.log(props);

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

  let imageComponent;
  if (image) {
    if (hochformat) {
      console.log("------ img", image, hochformat);
      imageComponent = <ImageElementContain src={image.url} alt={image.alt}></ImageElementContain>;
    } else {
      imageComponent = <ImageElement src={image.url} alt={image.alt}></ImageElement>;
    }
  }
  let hrefInternalLink = "";

  if (link) {
    if (link._modelApiKey === "projekt") {
      hrefInternalLink += `/projekte/${link.slug}`;
    } else if (link._modelApiKey === "veranstaltung") {
      hrefInternalLink += `/veranstaltungen/${link.slug}`;
    } else {
      hrefInternalLink += `/news/${slug}`;
    }
  } else if (weblink) {
    console.log("weblink", hrefInternalLink);
    hrefInternalLink = weblink;
  } else {
    hrefInternalLink += `/news/${slug}`;
  }
  /* let hrefveranstaltungen = `/veranstaltungen`
    if (props._modelApiKey === 'veranstaltung') {
        hrefveranstaltungen += `/${props.slug}`
    }
*/
  /*
  const date = new Date(props.datum).toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
*/
  // get array of Ids of tags for handleHover
  const researchFieldIdArray = forschungsfelder.reduce((acc, it) => {
    acc.push(it.id);
    return acc;
  }, []);

  // get Array of colors from all tags
  // cant use factory as there second color gets added and here we want full color if its only one forschungsfeld
  const colorArray = forschungsfelder.reduce((acc, it) => {
    acc.push(it.colour.hex);
    return acc;
  }, []);

  if (colorArray.length < 1) {
    colorArray[0] = "var(--maincolor)";
    colorArray[1] = "var(--secondcolor)";
  }

  //const colorArray = getColorArray(forschungsfelder);
  // make no gradient because of lots of text fade to white. Probably no news with more than one Forschungsfeld anyways
  //const gradient_highlight = colorArray[0]; //makeGradientFromArray(colorArray, "to right");

  let gradient_highlight = colorArray[0];
  if (colorArray.length > 1) {
    gradient_highlight = makeGradientFromArray(colorArray, "to right");
  }
  const animationOut = `${styles.fadeOut} 1.2s ease`;
  const animationIn = ` ${styles.fadeIn} 0.5s ease`;

  let background_style = getGradientBackgroundStyle(gradient_highlight, animationOut, 0);
  if (props.showGradient || showHoverGradient) {
    background_style = getGradientBackgroundStyle(gradient_highlight, animationIn, 1);
  }

  const gradient_image = makeGradient(colorArray[0] + "80", "rgba(255,255,255,0)", "to bottom");
  let background_style_image = getGradientBackgroundStyle(gradient_image, animationOut, 0);
  if (props.showGradient || showHoverGradient) {
    background_style_image = getGradientBackgroundStyle(gradient_image, animationIn, 1);
    // background_style_image["mix-blend-mode"] = "multiply";
    // background_style_image["zIndex"] = "100";
  }

  const plaintext = (txt) => {
    let t = render(txt);
    console.log(t.length);
    if (t.length > 150) {
      t = t.replace(/(.{150})..+/, "$1…");
    }
    return t;
  };

  const now = new Date();
  let date_parsed;
  if (new Date(date) < now) {
    date_parsed = new Date(date).toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    date_parsed = new Date(date).toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  console.log(date, date_parsed);

  return (
    <>
      <Tile key={id} id={id}>
        <div
          className={` ${styles.wrapper} ${showHoverGradient ? styles.highlight : ""}`}
          key={id}
          onMouseEnter={() => handleHover(true)}
          onTouchStart={() => handleHover(true)}
          onMouseLeave={() => handleHover(false)}
          onTouchEnd={() => handleHover(false)}
          onTouchCancel={() => handleHover(false)}
        >
          <GradientContainer backgroundStyle={background_style}>
            <div className={`${styles.menschwrapper}`}>
              <Link href={hrefInternalLink}>
                <a className={styles.listLinkBlank} {...(weblink ? { target: "_blank" } : {})}>
                  <span>
                    {image && (
                      <div className={styles.portraitWrapper}>
                        <GradientContainer backgroundStyle={background_style_image}>
                          {imageComponent}
                        </GradientContainer>
                      </div>
                    )}
                    {date && (
                      <div className={styles.datum}>{`${date_parsed} ${
                        new Date(date_parsed) < now ? "" : "Uhr"
                      }`}</div>
                    )}
                    <ElementTitle highlight={showHoverGradient}>{title}</ElementTitle>

                    <TextElement key={id} {...teaser}></TextElement>
                  </span>
                </a>
              </Link>
              {/*plaintext(text)*/}
              {/*link && <Link href={hrefInternalLink}>{link.titel}</Link>*/}
              <ForschungsfeldElement
                forschungsfeld={forschungsfelder}
                showHoverGradient={showHoverGradient}
              />
            </div>
          </GradientContainer>
        </div>
      </Tile>
    </>
  );
};

export default ListItemNews;
