import Layout from "../../Components/Layout/layout";
import Container from "../../Components/Container/container";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useContext } from "react";

import Article from "../../Components/Publicationtype/article";
import AudioVisual from "../../Components/Publicationtype/audioVisual";
import BookSection from "../../Components/Publicationtype/bookSection";
import Book from "../../Components/Publicationtype/book";
import ConferenceItem from "../../Components/Publicationtype/conferenceItem";
import MagazineArticle from "../../Components/Publicationtype/magazineArticle";
import Other from "../../Components/Publicationtype/other";
import Report from "../../Components/Publicationtype/report";
import Software from "../../Components/Publicationtype/software";
import Thesis from "../../Components/Publicationtype/thesis";

export default function Publikationseinzelansicht(props) {
  const { t } = useTranslation("common");

  const [publicationData, setPublicationData] = useState([]);

  const fetchPublications = async () => {
    const response = await fetch("/api/publications");
    const data = await response.json();
    setPublicationData(data);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading…</div>;
  }
  // console.log("router.query.slug",router.query.slug,publicationdata[0].eprintid);

  var data = publicationData.filter(
    (v) => v.eprintid.toString() === router.query.slug
  )[0];

  // -> das [0] ist weil filter ein array zurück gibt. bei uns aber mit nur einem element.
  // damit wir dann nicht immer ein array haben nehmen wir nun einfach das ereste element

  const element = (data) => {
    switch (data.type) {
      case "article":
        return <Article {...data} />;

      case "audio_visual":
        return <AudioVisual {...data} />;
      case "book":
        return <Book {...data} />;

      case "book_section":
        return <BookSection {...data} />;

      case "conference_item":
        return <ConferenceItem {...data} />;

      case "magazine_article":
        return <MagazineArticle {...data} />;

      case "other":
        return <Other {...data} />;

      case "report":
        return <Report {...data} />;

      case "software":
        return <Software {...data} />;

      case "thesis":
        return <Thesis {...data} />;

      default:
        return null;
    }
  };
  if (data) {
    return (
      <Layout
        setMainColor={props.setMainColor}
        setSecondColor={props.setSecondColor}
        colorHexCode={props.colorHexCode}
        colorHexCodeSecond={props.colorHexCodeSecond}
      >
        <Container>{element(data)}</Container>
      </Layout>
    );
  } else {
    return <>no data yet</>;
  }
}

export async function getStaticProps({ locale }) {
  //  const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
  //const publicationdata = await res.json()
  const publicationdata = "";
  return {
    props: {
      publicationdata,
      locale,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export async function getStaticPaths({ locales }) {
  const paths = [];
  return {
    paths,
    fallback: true,
  };
}
