import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Link from "next/link";

import { request, MENSCHEINZEL, ALLMENSCHEN } from "../../lib/datocms";
import styles from "./team.module.scss";

import Layout from "../../Components/Layout/layout";

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

export default function Menscheinzelansicht(props) {
  const router = useRouter();

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
              {t("BFHProfil")}
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
          <div className={styles.subtitel}>{t("Projekte")}</div>
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
            <span onClick={() => router.back()}>Click here to go back</span>

            <Container>
              <Title title={name} />

              {portrait !== null && (
                <ModularContentWrapper>
                  <ResponsiveImage
                    responsiveImage={portrait.responsiveImage}
                  ></ResponsiveImage>
                  {/** <ImageElement src={portrait.url}  alt={portrait.alt} focalPoint={portrait.focalPoint} ></ImageElement>*/}
                </ModularContentWrapper>
              )}

              <ModularContentWrapper>
                <div className={styles.subwrapper}>
                  {EmailElement}
                  {WebsiteElement}
                  <br></br>
                  {BFHProfilElement}
                </div>

                {ProjekteElement}
                <div className={styles.subwrapper}>
                  <div className={styles.subtitel}>{t("Forschungsfelder")}</div>
                  {forschungsfeld.map((forschungsfeld) => {
                    console.log("forschungsfeld", forschungsfeld);
                    if (forschungsfeld.titel === "ForscherInnen") {
                    } else if (forschungsfeld.titel === "Leitung und Büro") {
                    } else {
                      var forschungsfeldlink = forschungsfeld.titel;
                      var filtermitgeben = `${forschungsfeld.titel}`
                        .split(" ")
                        .join("-");

                      return (
                        <div
                          key={forschungsfeld.titel}
                          className={styles.projekt}
                        >
                          {/* {forschungsfeldlink} */}
                          <FilterLink
                            props={forschungsfeldlink}
                            href={{
                              pathname: "/editorial",
                              query: { keyword: `${filtermitgeben}` },
                            }}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </ModularContentWrapper>
            </Container>
          </div>
        </div>
      </Layout>
    );
  } else {
    return <></>;
  }
}

export async function getStaticProps({ params, locale }) {
  const data = await request({
    query: MENSCHEINZEL,
    variables: { slug: params.slug, locale: locale },
  });

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
    fallback: true,
  };
}
