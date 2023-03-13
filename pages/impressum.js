import { request, IMPRESSUM } from "../lib/datocms";
import styles from "./impressum.module.scss";
import Layout from "../Components/Layout/layout";
import Container from "../Components/Container/container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TextElement from "../Components/Composition/TextElement";
import React, { useState, useEffect } from "react";
import Header from "../Components/Header/header";
import HeaderWrapper from "../Components/HeaderWrapper/HeaderWrapper";
import { Backbutton } from "../Components";
import { ImageElementContain } from "../Components/Composition";

const Impressum = (props) => {
  const { t } = useTranslation("common");

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
      <Container>
        <div className={styles.impressumwrapper}>
          <div className={styles.subwrapper}>
            {props.impressum.impressum.impressumsblock.map((impressumsblock) => {
              return (
                <div>
                  <div className={styles.subtitel}>{impressumsblock.titel}</div>
                  <div className={styles.subtext}>
                    <TextElement {...impressumsblock.text} />
                  </div>
                </div>
              );
            })}
            <ImageElementContain
              src="/HKB_Markenzeichen_Kooperation_RGB_Schwarz.svg"
              width="100px"
            ></ImageElementContain>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Impressum;

export async function getStaticProps({ locale }) {
  const impressum = await request({
    query: IMPRESSUM,
    variables: { locale: locale },
  });

  return {
    props: {
      impressum,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
