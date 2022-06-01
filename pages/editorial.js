import React, { useEffect, useContext, useState } from "react";
import { request, EDITORIALTEXTE, EDITORIALINTRO } from "../lib/datocms";
import styles from "./editorial.module.scss";
import Layout from "../Components/Layout/layout";
import Container from "../Components/Container/container";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TextElement from "../Components/Composition/TextElement";
import FilterElement from "../Components/FilterElement/filterElement";
import ButtonLink from "../Components/ButtonLink/buttonLink";

import { Lupe } from "../Components";
import { FilterWrapper } from "../Components";
import { SearchTerm } from "../Components";
import { SearchTermWrapper } from "../Components";

import Header from "../Components/Header/header";
import HeaderWrapper from "../Components/HeaderWrapper/HeaderWrapper";

import { AppContext, ACTIONS } from "../context/state";
import { ServiceElement } from "../Components/Composition";

import { BackgroundGradientFadeOut } from "../Components";
import { GradientFadeIn } from "../Components";
import { TextContainer } from "../Components";

import { Title } from "../Components/Composition";

import {
  searchInput,
  searchInputArray,
  getIntersection,
  searchInputArrayRecursive,
} from "../lib/helpers";

const Editorial = (props) => {
  const {
    editorialtexte: { allEditorials, allProjekts, allForschungsfelders },
  } = props;

  const { editorialintro } = props;

  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const router = useRouter();
  console.log("Query", router.query);

  const { t } = useTranslation("common");

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

  useEffect(() => {
    if (router.query.keyword) {
      dispatch({
        type: ACTIONS.ADD_ACTIVE_FILTER,
        payload: { element: [router.query.keyword] },
      });

      /*  router.push({
        query: {},
      });*/
    }
  }, [router.query.keyword]);

  //Projekte zu Forschungsfeld dazufiltern
  function filterByForschungsfeld(data, filterterm) {
    return data.filter((obj) => {
      return obj.forschungsfeld.some((feld) => {
        return feld.id.includes(filterterm);
      });
    });
  }

  //nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
    console.log("data", data);
    if (filterterms.length < 1) return data; // wenn kein filter ist gibt some leer zurück
    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.some((term) => {
        return obj.forschungsfeld.some((feld) => {
          return feld.id.toString().includes(term);
        });
      });
    });
  }

  const [filterdList, setFilterdList] = useState([]);
  const [searchFilterdList, setSearchFilterdList] = useState([]);

  // get data after all filters
  let result =
    getIntersection([filterdList, searchFilterdList]) || allEditorials;
  console.log(
    "result",
    result,
    getIntersection([filterdList, searchFilterdList])
  );
  // on change active filters

  useEffect(() => {
    console.log("use effect", state.activeFilters);
    console.log("yy", filterBy(allEditorials, state.activeFilters));
    setFilterdList(filterBy(allEditorials, state.activeFilters)); // filter if any filter is set, else show all
    window.scrollTo(0, 0);
  }, [state.activeFilters]);

  // fields to search
  let fields = ["titel", "name", "value"];
  const [search, setSearch] = useState("");
  useEffect(() => {
    let array = [...state.searchTerms, search];
    setSearchFilterdList(
      searchInputArrayRecursive(allEditorials, array, fields)
    );
    window.scrollTo(0, 0);
  }, [search]);

  useEffect(() => {
    console.log(state.searchTerms);
    setSearchFilterdList(
      searchInputArrayRecursive(allEditorials, state.searchTerms, fields)
    );

    window.scrollTo(0, 0);
  }, [state.searchTerms]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("klicked enter", e.target.value);
      dispatch({
        type: ACTIONS.ADD_SEARCHTERM,
        payload: { element: e.currentTarget.value },
      });
    }
  };

  const handleSubmit = (e) => {
    console.log("submit", e);
    dispatch({
      type: ACTIONS.ADD_SEARCHTERM,
      payload: { element: e },
    });
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
        <FilterWrapper>
          <FilterElement filterarray={allForschungsfelders} />

          <Lupe
            setSearch={setSearch}
            handleKeyDown={handleKeyDown}
            handleSubmit={handleSubmit}
          ></Lupe>
        </FilterWrapper>
        <SearchTermWrapper>
          {state.searchTerms.map((term, index) => {
            return <SearchTerm key={index} term={term}></SearchTerm>;
          })}
        </SearchTermWrapper>
      </HeaderWrapper>
      {filterdList.length == allEditorials.length && (
        <div className={styles.editorialwrapper}>
          <Container>
            <Title title={editorialintro.editorialeinfHrungstext.titel} />

            <TextContainer>
              <div className={styles.text}>
                <TextElement {...editorialintro.editorialeinfHrungstext.text} />
              </div>
              <ServiceElement></ServiceElement>
            </TextContainer>
          </Container>
        </div>
      )}

      {result.map((editorial) => {
        const filterdProjectlist = filterByForschungsfeld(
          allProjekts,
          editorial.forschungsfeld[0].id
        ).slice(0, 5);

        let background_style;
        let background_style_small;
        let colors = [];
        editorial.forschungsfeld.map((forschungsfeld) => {
          colors.push(forschungsfeld.colour.hex);
        });
        background_style = {
          //            background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
          background: `linear-gradient(to bottom, ${
            colors[0] + "DD"
          },white, white)`,
        };
        background_style_small = {
          background: `linear-gradient(to right, ${colors[0]}, ${
            colors[1] || "white"
          })`,
        };

        return (
          <div
            className={styles.editorialwrapper}
            key={editorial.id}
            style={background_style}
          >
            <Container>
              {editorial.forschungsfeld.map((forschungsfeld) => {
                return (
                  <Title key={forschungsfeld.id} title={forschungsfeld.titel} />
                );
              })}
              <TextContainer>
                <div className={styles.text}>
                  {editorial.beitraege.map((beitrag) => {
                    return (
                      <TextElement
                        key={beitrag.id}
                        {...beitrag.text}
                      ></TextElement>
                    );
                  })}
                </div>
                <div className={styles.serviceWrapper}>
                  <ServiceElement title={t("Koord")}>
                    {editorial.menschen.map((koordinatorin) => {
                      let href = `/team`;
                      if (koordinatorin.slug != "") {
                        href += `/${koordinatorin.slug}`;
                      }
                      return <ButtonLink {...koordinatorin} href={href} />;
                    })}{" "}
                  </ServiceElement>

                  <ServiceElement
                    title={t("Projekte")}
                    style={{ width: 66 + "%" }}
                  >
                    {filterdProjectlist.map((projekt) => {
                      let href = `/projekte`;
                      if (projekt.slug != "") {
                        href += `/${projekt.slug}`;
                      }
                      return <ButtonLink {...projekt} href={href} />;
                    })}{" "}
                  </ServiceElement>
                </div>
                {/* *
              <div className={styles.listenwrapper}>
                <div>{t("Koord")}</div>
                {editorial.menschen.map((koordinatorin) => {
                  let href = `/team`;
                  if (koordinatorin.slug != "") {
                    href += `/${koordinatorin.slug}`;
                  }
                  return <ButtonLink {...koordinatorin} href={href} />;
                })}

                <div>{t("Projekte")}</div>
                {filterdProjectlist.map((projekt) => {
                  // console.log("projekt slug?", projekt)
                  let href = `/projekte`;
                  if (projekt.slug != "") {
                    href += `/${projekt.slug}`;
                  }
                  return <ButtonLink {...projekt} href={href} />;
                })}
              </div>
              */}
              </TextContainer>
            </Container>
          </div>
        );
      })}
    </Layout>
  );
};

export default Editorial;

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({ locale }) {
  const editorialtexte = await request({
    query: EDITORIALTEXTE,
    variables: { locale: locale },
  });
  const editorialintro = await request({
    query: EDITORIALINTRO,
    variables: { locale: locale },
  });

  return {
    props: {
      editorialtexte,
      editorialintro,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
