import { request, ALLNEWS, PODCAST } from "../lib/datocms";
import styles from "./podcasts.module.scss";
import Layout from "../Components/Layout/layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useContext } from "react";
import { AppContext, ACTIONS } from "../context/state";

import Header from "../Components/Header/header";
import HeaderWrapper from "../Components/HeaderWrapper/HeaderWrapper";

import TextElement from "../Components/Composition/TextElement";
import Container from "../Components/Container/container";

import { PodcastFeed } from "../Components/Composition";
export default function Podcasts(props) {
  const {
    data: { podcast },
  } = props;

  // console.log("homeprops", links);
  const { t } = useTranslation("common");

  // context
  const globalState = useContext(AppContext);
  const { dispatch } = globalState;
  const { state } = globalState;

  const removeAllHoverFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_HOVER_FILTER });
  };
  const removeAllActiveFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_ACTIVE_FILTER });
  };
  const removeAllSearchterms = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_SEARCHTERM });
  };

  useEffect(() => {
    removeAllHoverFilter();
    removeAllActiveFilter();
    removeAllSearchterms();
  }, []);

  const [showGradient, setShowGradient] = useState(false);

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
        <div className={styles.modulareinhalte}>
          {podcast.content != null &&
            podcast.content.map((block) => {
              console.log("block", block);
              return (
                <div key={block.id}>
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

                  {block._modelApiKey === "galerie" && <Gallery data={block.galerie}></Gallery>}

                  {block._modelApiKey === "video" && (
                    <Video key={block.id} data={block.clip} caption={block.caption}></Video>
                  )}

                  {block._modelApiKey === "pdf" && block.pdf != null && (
                    <ButtonLink key={block.id} {...block} href={block.pdf.url} newTab="true" />
                  )}
                </div>
              );
            })}
        </div>
      </Container>
      <PodcastFeed />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const data = await request({
    query: PODCAST,
    variables: { locale: locale },
  });

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
