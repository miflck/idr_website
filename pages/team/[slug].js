import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";
import Link from "next/link";

import { request, MENSCHEINZEL, ALLMENSCHEN } from "../../lib/datocms";
import styles from "./team.module.scss";

import Layout from "../../Components/Layout/layout";
import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";

import Container from "../../Components/Container/container";
import ButtonLink from "../../Components/ButtonLink/buttonLink";
import FilterLink from "../../Components/FilterLink/filterLink";
import { Title } from "../../Components/Composition";
import ImageElement from "../../Components/Composition/ImageElement";
import { ModularContentWrapper } from "../../Components/Composition";
import { SpacedWrapper } from "../../Components/Composition";
import { GradientContainer } from "../../Components";
import { BackgroundGradientFadeOut } from "../../Components";
import { GradientFadeIn } from "../../Components";
import { ResponsiveImage } from "../../Components";
import { Backbutton } from "../../Components";
import { ServiceElement } from "../../Components/Composition";
import Button from "../../Components/Button/Button";
export default function Menscheinzelansicht(props) {
  const router = useRouter();

  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const { t } = useTranslation("common");
  console.log("props  team einzeln", props);
  const {
    data: {
      menschen: {
        name,
        id,
        slug,
        forschungsfeld,
        portrait,
        bfhprofil,
        email,
        website,
      } = "",
    } = "",
  } = props || "";

  const { data: { allProjekts } = "" } = props || "";
  if (props.data) {
    function filterBy(data, filterterm) {
      return data.filter((obj) => {
        return obj.mitarbeit.some((feld) => {
          return feld.name.includes(filterterm);
        });
      });
    }

    const filterdProjectlist = filterBy(allProjekts, name);

    const handleHover = (isHover, id) => {
      if (isHover) {
        //  dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: [id] } })
      } else {
        //  dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element:[id] } })
      }
    };

    const handleClick = (bool, id) => {
      if (state.activeFilters.some((e) => e === id)) {
        dispatch({
          type: ACTIONS.REMOVE_ACTIVE_FILTER,
          payload: { element: [id] },
        });
      } else {
        dispatch({
          type: ACTIONS.ADD_ACTIVE_FILTER,
          payload: { element: [id] },
        });
      }

      router.push({
        pathname: "/editorial",
        //query: { keyword: `${filtermitgeben}` }
      });
    };

    let EmailElement;
    if (email != "") {
      EmailElement = (
        <div>
          <Link href={`mailto:,${email}`}>
            <a className={styles.email}>{email}</a>
          </Link>
        </div>
      );
    }
    let WebsiteElement;
    if (website != "") {
      WebsiteElement = (
        <div>
          <Link href={website}>
            <a className={styles.website} target="_blank">
              {website}
            </a>
          </Link>
        </div>
      );
    }
    let BFHProfilElement;
    if (bfhprofil != "") {
      BFHProfilElement = (
        <div className={styles.bfhprofil}>
          <Link href={bfhprofil}>
            <a className={styles.bfhprofil} target="_blank">
              {name}
            </a>
          </Link>
        </div>
      );
    }

    let ProjekteElement;
    if (filterdProjectlist.length != 0) {
      // console.log("filterdProjectlist",filterdProjectlist)
      ProjekteElement = (
        <div className={styles.subwrapper}>
          {filterdProjectlist.map((projekt) => {
            let href = `/projekte`;
            if (projekt.slug != "") {
              href += `/${projekt.slug}`;
            }
            return <ButtonLink {...projekt} href={href} />;
          })}
        </div>
      );
    }

    let background_style;
    let colors = [];
    if (forschungsfeld.length != 0) {
      forschungsfeld.map((forschungsfeld) => {
        // console.log("farbe hats oder nicht", forschungsfeld.titel)
        if (forschungsfeld.titel === "ForscherInnen") {
        } else if (forschungsfeld.titel === "Leitung und Büro") {
        } else {
          colors.push(forschungsfeld.colour.hex);
        }
      });
    }
    background_style = {
      background: `linear-gradient(to right, ${colors[0]}, ${
        colors[1] || "white"
      })`,
    };
    let background_style_small = {
      background: `linear-gradient(to right, ${colors[0]}, ${
        colors[1] || "white"
      })`,
    };

    let background_op = {
      background: `radial-gradient(ellipse at bottom,rgba(255,255,255,1),transparent),
                      linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1))`,
    };

    return (
      <Layout
        setMainColor={props.setMainColor}
        setSecondColor={props.setSecondColor}
        colorHexCode={props.colorHexCode}
        colorHexCodeSecond={props.colorHexCodeSecond}
      >
        <Container>
          <Backbutton />
        </Container>
        {/* Hintergrund ganze seite */}
        <BackgroundGradientFadeOut
          backgroundStyle={background_style}
        ></BackgroundGradientFadeOut>

        <div className={styles.stickywrapper}>
          <GradientFadeIn
            backgroundStyle={background_style}
            backgroundOpacity={background_op}
          ></GradientFadeIn>

          {/* Hintergrund fade  
          <div className={styles.gradient_opacity} style={background_style}>
            <div className={styles.background_small} style={background_op}></div>
          </div>        
       */}

          <div className={styles.slugwrapper}>
            <Container>
              <Title title={name} />
              {portrait !== null && (
                <ModularContentWrapper>
                  <div className={styles.portrait}>
                    <ResponsiveImage
                      responsiveImage={portrait.responsiveImage}
                    ></ResponsiveImage>
                  </div>
                  {/** <ImageElement src={portrait.url}  alt={portrait.alt} focalPoint={portrait.focalPoint} ></ImageElement>*/}
                </ModularContentWrapper>
              )}

              <ModularContentWrapper>
                <ServiceElement title={t("Kontakt")}>
                  {EmailElement}
                  {WebsiteElement}{" "}
                </ServiceElement>

                <ServiceElement title={t("BFHProfil")}>
                  {BFHProfilElement}
                </ServiceElement>

                <ServiceElement title={t("Projekte")}>
                  {ProjekteElement}
                </ServiceElement>

                <div className={styles.subwrapper}>
                  <ServiceElement title={t("Forschungsfelder")}>
                    {forschungsfeld.map((forschungsfeld) => {
                      let hover_class = {
                        color: "var(--maincolor)",
                        background: "var(--secondcolor)", //`linear-gradient(to right, white, ${forschungsfeld.colour.hex})`,
                        opacity: 1,
                      };
                      return (
                        <Button
                          key={forschungsfeld.id}
                          title={forschungsfeld.titel}
                          id={forschungsfeld.id}
                          style={hover_class}
                          handleClick={handleClick}
                          handleHover={handleHover}
                        />
                      );
                    })}
                  </ServiceElement>
                </div>
              </ModularContentWrapper>
            </Container>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <div>No datac</div>;
  }
}

export async function getStaticProps({ params, locale }) {
  let data = null;
  try {
    data = await request({
      query: MENSCHEINZEL,
      variables: { slug: params.slug, locale: locale },
    });
  } catch (err) {}

  return {
    props: {
      data,
      params,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    }, // will be passed to the page component as props
  };
}

// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
export async function getStaticPaths({ locales }) {
  const paths = [];

  const m = await request({
    query: ALLMENSCHEN,
  });

  locales.forEach((locale, i) => {
    m.allMenschens.forEach((mensch, j) => {
      paths.push({
        params: {
          slug: mensch.slug,
        },
        locale,
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
}
