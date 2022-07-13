import React, { useEffect, useContext, useState } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import Layout from "../../Components/Layout/layout";
import {
  request,
  PROJEKTEINZEL,
  ALLPROJEKTE,
  PROJEKTE,
} from "../../lib/datocms";
import styles from "./projekte.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Container from "../../Components/Container/container";
import TextElement from "../../Components/Composition/TextElement";
import ImageElement from "../../Components/Composition/ImageElement";
import ButtonLink from "../../Components/ButtonLink/buttonLink";

import { useRouter } from "next/router";

import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";

import Button from "../../Components/Button/Button";
import { Backbutton } from "../../Components";

import { Title } from "../../Components/Composition";
import { ServiceElement } from "../../Components/Composition";
import ModularContentWrapper from "../../Components/Composition/ModularContentWrapper/ModularContentWrapper";

import { BackgroundGradientFadeOut } from "../../Components";
import { GradientFadeIn } from "../../Components";

import { Gallery } from "../../Components";
import { Video } from "../../Components";

export default function Projekteinzelansicht(props) {
  const { t } = useTranslation("common");
  console.log("props  projekt", props);
  const {
    data: {
      projekt: {
        titel,
        id,
        leitung,
        verantwortung,
        mitarbeit,
        kooperationen,
        finanzierung,
        projektinhalte,
        serviceBlocks,
        forschungsfeld,
        startdatum,
        enddatum,
      } = "",
    } = "",
  } = props || "";

  // Sort names
  const mitarbeitarray = mitarbeit.map((m) => {
    let names = m.name.trim().split(" ");

    return { ...m, lastname: names[names.length - 1] };
  });
  mitarbeitarray.sort((a, b) => {
    // console.log("lastname sort", a.lastname);
    return a.lastname.localeCompare(b.lastname);
  });

  const leitungsarray = leitung.map((m) => {
    let names = m.name.trim().split(" ");

    return { ...m, lastname: names[names.length - 1] };
  });

  leitungsarray.sort((a, b) => {
    // console.log("lastname sort", a.lastname);
    return a.lastname.localeCompare(b.lastname);
  });

  const verantwortungarray = verantwortung.map((m) => {
    let names = m.name.trim().split(" ");
    return { ...m, lastname: names[names.length - 1] };
  });

  verantwortungarray.sort((a, b) => {
    // console.log("lastname sort", a.lastname);
    return a.lastname.localeCompare(b.lastname);
  });

  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading…</div>;
  }

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_PATH,
      payload: { element: router.pathname },
    });
  }, []);

  const handleHover = (isHover, id) => {
    if (isHover) {
      //  dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: [id] } })
    } else {
      //  dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element:[id] } })
    }
  };

  /*
  const handleClick = (bool,id) => {
    console.log(id)
    let f=forschungsfeld.filter((e) => e.id===id)
    console.log("Klick auf Forschungsfeld",f)
    var filtermitgeben = `${f[0].titel}`.split(" ").join("-");
    router.push({
      pathname: '/editorial', 
      query: { keyword: `${filtermitgeben}` }
    })
};*/

  const handleClick = (bool, id) => {
    if (state.activeFilters.some((e) => e === id)) {
      dispatch({
        type: ACTIONS.REMOVE_ACTIVE_FILTER,
        payload: { element: [id] },
      });
    } else {
      dispatch({ type: ACTIONS.ADD_ACTIVE_FILTER, payload: { element: [id] } });
    }

    router.push({
      pathname: "/editorial",
      query: { keyword: `${id}` },
    });
  };

  if (props.data) {
    var options = { year: "numeric", month: "long" };
    const startzeitraum = new Date(startdatum).toLocaleDateString(
      router.locale,
      options
    );
    const endzeitraum = new Date(enddatum).toLocaleDateString(
      router.locale,
      options
    );

    let background_style;
    let colors = [];

    forschungsfeld.map((forschungsfeld) => {
      colors.push(forschungsfeld.colour.hex);
    });

    background_style = {
      background: `linear-gradient(to right, ${colors[0]}, ${
        colors[1] || "white"
      })`,
    };

    let background_op = {
      background: `radial-gradient(ellipse at bottom,rgba(255,255,255,1),transparent),
                      linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1))`,
    };

    /*
    verantwortung.map((e) => {
      console.log("------------e", e);

      if (e.organisation != null) {
        console.log("------------e.organisation", e.organisation.title);

        const doubled = e.organisation.reduce((total, amount) => {
          // total.push(amount * 2);

          console.log("------------total", amount);
          return total;
        }, []);
      } else return "";
    });
*/
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
        {/* Hintergrund ganze seite 
    <div className={styles.background} style={background_style}></div>
    */}
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
              <Title title={titel} />
              <div className={styles.modulareinhalte}>
                {projektinhalte != null &&
                  projektinhalte.map((block) => {
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

                        {block._modelApiKey === "video" && (
                          <Video
                            key={block.id}
                            data={block.clip}
                            caption={block.caption}
                          ></Video>
                        )}

                        {block._modelApiKey === "pdf" && block.pdf != null && (
                          <ButtonLink
                            key={block.id}
                            {...block}
                            href={block.pdf.url}
                            newTab="true"
                          />
                        )}
                      </ModularContentWrapper>
                    );
                  })}
              </div>
            </Container>
          </div>
        </div>
        {/* Hintergrund fade 
    <div className={styles.gradient_opacity_line} style={background_style}>
      <div className={styles.background_small} style={background_op}></div>
    </div>
*/}
        <Container>
          <div className={styles.serviceWrapper}>
            <ServiceElement title={t("Zeitraum")}>
              {startzeitraum} – {endzeitraum}
            </ServiceElement>

            <ServiceElement title={t("Leitung")}>
              {leitungsarray.map((e) => {
                let href = `/team`;

                if (e.slug != "") {
                  href += `/${e.slug}`;
                }
                let org = "";
                if (e.organisation != null) {
                  org = ", " + e.organisation.title;
                }
                if (e.aktiv & !e.extern) {
                  return <ButtonLink key={e.id} {...e} href={href} />;
                } else {
                  return (
                    <div key={e.id} className={styles.serviceElement}>
                      {e.name}
                      {org}
                    </div>
                  );
                }
              })}
            </ServiceElement>

            {verantwortungarray != "" && (
              <ServiceElement title={t("Verantwortung")}>
                {verantwortungarray.map((e) => {
                  let href = `/team`;

                  let org = "";
                  if (e.organisation != null) {
                    org = ", " + e.organisation.title;
                  }
                  if (e.slug != "") {
                    href += `/${e.slug}`;
                  }
                  if (e.aktiv & !e.extern) {
                    return <ButtonLink key={e.id} {...e} href={href} />;
                  } else {
                    return (
                      <div key={e.id} className={styles.serviceElement}>
                        {e.name}
                        {org}
                      </div>
                    );
                  }
                })}
              </ServiceElement>
            )}

            {mitarbeit != "" && (
              <ServiceElement title={t("Mitarbeit")}>
                {
                  //mitarbeit.map((e) => {
                  mitarbeitarray.map((e) => {
                    let href = `/team`;
                    let org = "";
                    if (e.organisation != null) {
                      org = ", " + e.organisation.title;
                    }
                    if (e.slug != "") {
                      href += `/${e.slug}`;
                    }
                    if (e.aktiv & !e.extern) {
                      return <ButtonLink key={e.id} {...e} href={href} />;
                    } else {
                      return (
                        <div key={e.id} className={styles.serviceElement}>
                          {e.name}
                          {org}
                        </div>
                      );
                    }
                  })
                }
              </ServiceElement>
            )}

            {kooperationen != "" && (
              <ServiceElement title={t("Kooperationen")}>
                {kooperationen.map((e) => {
                  return (
                    <div key={e.id} className={styles.serviceElement}>
                      {e.title}
                    </div>
                  );
                })}
              </ServiceElement>
            )}

            {finanzierung != "" && (
              <ServiceElement title={t("Finanzierung")}>
                {finanzierung.map((e) => {
                  return (
                    <div key={e.id} className={styles.serviceElement}>
                      {e.title}
                    </div>
                  );
                })}
              </ServiceElement>
            )}

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
        </Container>
      </Layout>
    );
  } else {
    return <></>;
  }
}

export async function getStaticProps({ params, locale }) {
  const data = await request({
    query: PROJEKTEINZEL,
    variables: { slug: params.slug, locale: locale },
  });
  locale = "de";
  return {
    props: {
      data,
      params,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
//-> nicht ganz, die brachen wir, falls wir auf dem server prerendern wollen. also statische seiten generieren, damit die maschine weiss, welche seiten zu generieren sind glaubs
export async function getStaticPaths({ locales }) {
  const paths = [];

  const projekte = await request({
    query: ALLPROJEKTE,
  });
  // hier bei über 100 ein problem! irgend was rekursives bauen?
  locales.forEach((locale, i) => {
    projekte.allProjekts.forEach((projekt, j) => {
      paths.push({
        params: {
          slug: projekt.slug,
        },
        locale,
      });
    });
  });

  // Irgendwie so würde man wohl die pfade finden
  /*
  const data = await request({
    query: ALLPROJEKTE
  });
  // loop durch die sprachen
  locales.forEach((locale, i) => {
    data.allProjekts.forEach((projekt, j) => {
      console.log(locale,projekt)
      paths.push({ 
        params: { 
          slug:projekt.slug
        }, 
        locale})

      }
    )
  }
  )*/
  return {
    paths,
    fallback: false,
  };
}
