import React from "react";
import styles from "./publicationtype.module.scss";
import Link from "next/link";
import FilterLink from "../FilterLink/filterLink";
import { useTranslation } from "next-i18next";

const All = (data) => {
  const { t } = useTranslation("common");

  var typewithoutunderline = data.type.split("_").join(" ");

  let SprachElement;
  if (data.language === "en") {
    SprachElement = <div>{t("Englisch")}</div>;
  } else if (data.language === "de") {
    SprachElement = <div>{t("Deutsch")}</div>;
  } else if (data.language === "deu") {
    SprachElement = <div>{t("Deutschumgang")}</div>;
  }

  return (
    <>
      <div className={styles.subwrapper}>
        <div className={styles.subtitel}>{t("Type")}</div>
        <FilterLink
          props={typewithoutunderline}
          href={{
            pathname: "/publikationen",
            query: { keyword: `${data.type}` },
          }}
        />
      </div>

      <div className={styles.subwrapper}>
        <div className={styles.subtitel}>{t("Mitwirkende")}</div>
        {data.contributors.map((contributor) => {
          return (
            <div className={styles.name}>
              {contributor.name.given}&nbsp;
              {contributor.name.family}
            </div>
          );
        })}
      </div>
      <div className={styles.subwrapper}>
        <div className={styles.subtitel}>{t("Autorenschaft")}</div>
        {data.creators.map((creator) => {
          return (
            <div className={styles.name}>
              {creator.name.given}&nbsp;
              {creator.name.family}
            </div>
          );
        })}
      </div>

      <div className={styles.subwrapper}>
        <div className={styles.subtitel}>{t("Sprache")}</div>
        {SprachElement}
      </div>

      <div className={styles.subwrapper}>
        <div className={styles.subtitel}>{t("Repository")}</div>
        <Link href={data.uri}>
          <a target="_blank">{data.uri}</a>
        </Link>
      </div>
    </>
  );
};
export default All;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
