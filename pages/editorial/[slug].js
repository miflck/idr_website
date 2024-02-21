import React, { useState, useContext } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import {
  request,
  EDITORIALTEXTE,
  EDITORIALEINZELN,
  PROJEKTE,
} from "../../lib/datocms";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../Components/Layout/layout";
import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";
import {
  Title,
  TextElement,
  ImageElement,
  Gallery,
  Video,
  ServiceElement,
  ModularContentWrapper,
} from "../../Components/Composition";
import {
  Backbutton,
  BackgroundGradientFadeOut,
  GradientFadeIn,
} from "../../Components";
import ButtonLink from "../../Components/ButtonLink/buttonLink";
import Container from "../../Components/Container/container";
import ListItemProjekt from "../../Components/List/listItemProjekt";

import styles from "./editorial.module.scss";

const EditorialSingleview = (props) => {
  const { t } = useTranslation("common");

  const {
    data: {
      editorial: { title, beitraege, menschen, id, forschungsfeld } = "",
    } = "",
  } = props || "";
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

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
            <Title title={title} />
            {beitraege != null &&
              beitraege.map((block) => {
                return (
                  <ModularContentWrapper key={block.id}>
                    {block._modelApiKey === "text" && (
                      <TextElement key={block.id} {...block.text}></TextElement>
                    )}
                    {block._modelApiKey === "einzelbild" && (
                      <ImageElement
                        key={block.einzelbild.id}
                        src={block.einzelbild.url}
                        title={block.einzelbild.title}
                        alt={block.einzelbild.alt}
                        width={block.einzelbild.width}
                        height={block.einzelbild.height}
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
                  </ModularContentWrapper>
                );
              })}
          </Container>

          <Container>
            <div className={styles.serviceWrapper}>
              <ServiceElement title={t("Koord")}>
                {menschen.map((koordinatorin) => {
                  let href = `/team`;
                  if (koordinatorin.slug != "") {
                    href += `/${koordinatorin.slug}`;
                  }
                  return (
                    <ButtonLink
                      key={koordinatorin.id}
                      {...koordinatorin}
                      href={href}
                    />
                  );
                })}{" "}
              </ServiceElement>
              {/* <ServiceElement title={t("Projekte")} style={{ width: 66 + "%" }}>
                {props.filteredProjekts.map((projekt) => {
                  let href = `/projekte`;
                  if (projekt.slug != "") {
                    href += `/${projekt.slug}`;
                  }
                  return (
                    <ButtonLink {...projekt} href={href} key={projekt.id} />
                  );
                })}{" "}
              </ServiceElement> */}
            </div>
          </Container>

          <Container>
            {" "}
            <div className={styles.serviceWrapper}>
              <h3>{t("Projekte")}</h3>
            </div>
          </Container>

          <div className={styles.listwrapper}>
            {
              //filterdList.map((projekt) => {
              props.filteredProjekts.map((projekt) => {
                return (
                  <ListItemProjekt
                    {...projekt}
                    key={projekt.id}
                    showGradient={false}
                  />
                );
              })
            }{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditorialSingleview;

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({ params, locale }) {
  const editorialtexte = await request({
    query: EDITORIALTEXTE,
    variables: { locale: locale },
  });
  const data = await request({
    query: EDITORIALEINZELN,
    variables: { slug: params.slug, locale: locale },
  });
  locale = "de";

  // Fetch projects based on forschungsfeld ID
  const { allProjekts } = await request({
    query: PROJEKTE,
    variables: {
      locale: locale,
    },
  });

  // Extract forschungsfeld ID from the editorial data
  const forschungsfeldId = data?.editorial?.forschungsfeld[0]?.id;

  // Assuming forschungsfeldId is a string
  const filteredProjekts = allProjekts.filter((projekt) => {
    // Check if any forschungsfeld in the array matches the forschungsfeldId
    return projekt.forschungsfeld.some(
      (forschungsfeld) => forschungsfeld.id === forschungsfeldId
    );
  });

  // const filteredProjekts = allProjekts.filter((projekt) => {
  //   return projekt.forschungsfeld.some((feld) => {
  //     return feld.id.includes(forschungsfeldId);
  //   });
  // });

  return {
    props: {
      data,
      params,
      locale,
      editorialtexte,
      filteredProjekts: filteredProjekts ?? [],

      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
//-> nicht ganz, die brachen wir, falls wir auf dem server prerendern wollen. also statische seiten generieren, damit die maschine weiss, welche seiten zu generieren sind glaubs
export async function getStaticPaths({ locales }) {
  const paths = [];

  const editorials = await request({
    query: EDITORIALTEXTE,
  });
  // hier bei über 100 ein problem! irgend was rekursives bauen?
  locales.forEach((locale, i) => {
    editorials.allEditorials.forEach((editorial, j) => {
      paths.push({
        params: {
          slug: editorial.slug,
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
