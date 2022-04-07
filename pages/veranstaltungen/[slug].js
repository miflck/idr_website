import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";

import Layout from "../../Components/Layout/layout";
import {
  request,
  VERANSTALTUNGEINZEL,
  ALLVERANSTALTUNGEN,
} from "../../lib/datocms";
import styles from "./veranstaltungen.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "../../Components/Container/container";
import FilterLink from "../../Components/FilterLink/filterLink";
import { Backbutton } from "../../Components";

import { useRouter } from "next/router";

import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";
import Header from "../../Components/Header/header";
import { BackgroundGradientFadeOut } from "../../Components";
import { GradientFadeIn } from "../../Components";

import Button from "../../Components/Button/Button";
import { Title } from "../../Components/Composition";
import { ModularContentWrapper } from "../../Components/Composition";
import { ServiceElement } from "../../Components/Composition";

import TextElement from "../../Components/Composition/TextElement";
import ImageElement from "../../Components/Composition/ImageElement";
import { Gallery } from "../../Components";
import ButtonLink from "../../Components/ButtonLink/buttonLink";

export default function Veranstaltungseinzelansicht(props) {
  const {
    data: {
      veranstaltung: {
        titel,
        id,
        datum,
        referentIn,
        untertitel,
        modularcontent,

        forschungsfeld,
        serviceBlocks,
      } = "",
    } = "",
  } = props || "";

  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const { t } = useTranslation("common");

  const router = useRouter();
  if (router.isFallback) {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Fallback");
    return <div>Loading…</div>;
  }

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
      dispatch({ type: ACTIONS.ADD_ACTIVE_FILTER, payload: { element: [id] } });
    }

    //router.push({
    //pathname: "/editorial",
    //query: { keyword: `${filtermitgeben}` }
    //});
    router.push({
      pathname: "/editorial",
      //query: { keyword: `${filtermitgeben}` },
    });
  };

  if (props.data) {
    const date = new Date(datum).toLocaleString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    let background_style;
    let colors = [];

    forschungsfeld.map((forschungsfeld) => {
      colors.push(forschungsfeld.colour.hex);
    });

    background_style = {
      background: `linear-gradient(to right, ${
        colors[0] || "var(--maincolor)"
      }, ${colors[1] || "white"}`,
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
        <HeaderWrapper>
          <Header></Header>
        </HeaderWrapper>

        <Container>
          <Backbutton />
        </Container>

        <BackgroundGradientFadeOut
          backgroundStyle={background_style}
        ></BackgroundGradientFadeOut>
        <div className={styles.stickywrapper}>
          <GradientFadeIn
            backgroundStyle={background_style}
            backgroundOpacity={background_op}
          ></GradientFadeIn>

          <div className={styles.slugwrapper}>
            <Container>
              <Title title={titel} subtitle={untertitel} toptitle={date} />
              <div className={styles.modulareinhalte}>
                {/*<div className={styles.datum}>
              {date} {t("Uhr")}
              </div>
            <div className={styles.untertitel}>{untertitel}</div>
            */}

                {modularcontent != null &&
                  modularcontent.map((block) => {
                    console.log("block", block);

                    return (
                      <ModularContentWrapper key={block.id}>
                        {block._modelApiKey === "text" && (
                          <TextElement
                            key={block.id}
                            {...block.text}
                          ></TextElement>
                        )}
                        {block._modelApiKey === "einzelbild" && (
                          <ImageElement
                            key={block.einzelbild.id}
                            src={block.einzelbild.url}
                            title={block.einzelbild.title}
                            alt={block.einzelbild.alt}
                          />
                        )}

                        {block._modelApiKey === "galerie" && (
                          <Gallery data={block.galerie}></Gallery>
                        )}

                        {block._modelApiKey === "pdf" && (
                          <ButtonLink
                            key={block.id}
                            {...block}
                            href={block.pdf.url}
                          />
                        )}
                      </ModularContentWrapper>
                    );
                  })}
              </div>
            </Container>
          </div>
        </div>

        <Container>
          <div className={styles.serviceWrapper}>
            <ServiceElement title={t("Zeit")}>{date}</ServiceElement>
            <ServiceElement title={t("ReferentIn")}>
              {referentIn}
            </ServiceElement>

            {serviceBlocks != null &&
              serviceBlocks.map((block) => {
                return (
                  <ServiceElement key={block.key} title={block.title}>
                    {block.persons.map((person) => {
                      let href = `/team`;
                      if (person.slug != "") {
                        href += `/${person.slug}`;
                      }
                      return <ButtonLink {...person} href={href} />;
                    })}
                    <TextElement {...block.text} />
                    {block.projects.map((p) => {
                      let href = `/projekte`;
                      if (p.slug != "") {
                        href += `/${p.slug}`;
                      }
                      return <ButtonLink {...p} href={href} />;
                    })}
                  </ServiceElement>
                );
              })}

            {forschungsfeld.length > 0 && (
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
            )}
          </div>
        </Container>
      </Layout>
    );
  } else {
    return <></>;
  }
}

export async function getStaticProps({ params, locale }) {
  const data = await request({
    query: VERANSTALTUNGEINZEL,
    variables: { slug: params.slug, locale: locale },
  });

  return {
    props: {
      data,
      params,
      ...(await serverSideTranslations(locale, ["common"])),
    }, // will be passed to the page component as props
  };
}

// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
export async function getStaticPaths({ locales }) {
  const paths = [];
  const v = await request({
    query: ALLVERANSTALTUNGEN,
  });

  console.log("v", v);

  locales.forEach((locale, i) => {
    v.allVeranstaltungs.forEach((veranstaltung, j) => {
      paths.push({
        params: {
          slug: veranstaltung.slug,
        },
        locale,
      });
    });
  });
  return {
    paths,
    fallback: true,
  };
}

{
  /* <div className={styles.subwrapper}>
            <div className={styles.subtitel}>{t("Forschungsfelder")}</div>
            {forschungsfeld.map((forschungsfeld) => {
              var filtermitgeben = `${forschungsfeld.titel}`
                .split(" ")
                .join("-");
              return (
              <FilterLink
                  props={forschungsfeld.titel}
                  href={{
                    pathname: "/editorial",
                    query: { keyword: `${filtermitgeben}` },
                  }}
                />
              );
            })}
          </div> */
}
