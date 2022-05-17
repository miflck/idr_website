import React, { useEffect, useContext, useState } from "react";
import { request, EDITORIALTEXTE, EDITORIALINTRO } from "../lib/datocms";
import styles from "./editorial.module.scss";
import Layout from "../Components/Layout/layout";
import Container from "../Components/Container/container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TextElement from "../Components/Composition/TextElement";
import FilterElement from "../Components/FilterElement/filterElement";
import ButtonLink from "../Components/ButtonLink/buttonLink";
import SuchFeldElement from "../Components/SuchFeldElement/SuchFeldElement";

import { Lupe } from "../Components";
import { FilterWrapper } from "../Components";
import { SearchTerm } from "../Components";
import { searchInputArray } from "../lib/helpers";

import Header from "../Components/Header/header";
import HeaderWrapper from "../Components/HeaderWrapper/HeaderWrapper";

import { AppContext, ACTIONS } from "../context/state";
import { ServiceElement } from "../Components/Composition";

import { BackgroundGradientFadeOut } from "../Components";
import { GradientFadeIn } from "../Components";
import { TextContainer } from "../Components";

import { Title } from "../Components/Composition";
const Editorial = (props) => {
  const {
    editorialtexte: { allEditorials, allProjekts, allForschungsfelders },
  } = props;

  const { editorialintro } = props;

  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const { t } = useTranslation("common");

  const removeAllHoverFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_HOVER_FILTER });
  };
  const removeAllActiveFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_ACTIVE_FILTER });
  };

  useEffect(() => {
    removeAllHoverFilter();
    removeAllActiveFilter();
  }, []);

  const [filterdList, setFilterdList] = useState(allEditorials);

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
    return data.filter((obj) => {
      // check if filter is active or show all
      if (filterterms.length > 0) {
        //kann sein: every für && und some für || ?
        return filterterms.some((term) => {
          return obj.forschungsfeld.some((feld) => {
            return feld.id.toString().includes(term);
          });
        });
      } else {
        return true;
      }
    });
  }

  useEffect(() => {
    setFilterdList(filterBy(allEditorials, state.activeFilters)); // filter if any filter is set, else show all
  }, [state.activeFilters]);

  // Lupenfilter muss ins Textfeld, Forschungsfeld, Titel
  function searchInput(data, inputvalue) {
    return data.filter((obj) => {
      return Object.keys(obj).some((key) => {
        if (Array.isArray(obj[key])) {
          return obj[key].some((entry) => {
            return Object.keys(entry).some((kkey) => {
              return entry[kkey].toString().includes(inputvalue);
            });
          });
        } else {
          return obj[key]
            .toString()
            .toLowerCase()
            .includes(inputvalue.toLowerCase());
        }
      });
    });
  }

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

  useEffect(() => {
    console.log(state.searchTerms);
    const isEmpty = Object.keys(state.searchTerms).length === 0;
    // if (!isEmpty)
    setFilterdList(searchInputArray(allEditorials, state.searchTerms));
  }, [state.searchTerms]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search) {
      setFilterdList(searchInput(allEditorials, search));
    }
  }, [search]);

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
          {state.searchTerms.map((term, index) => {
            return <SearchTerm key={index} term={term}></SearchTerm>;
          })}
          <Lupe
            setSearch={setSearch}
            handleKeyDown={handleKeyDown}
            handleSubmit={handleSubmit}
          ></Lupe>
        </FilterWrapper>
      </HeaderWrapper>

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

      {filterdList.map((editorial) => {
        const filterdProjectlist = filterByForschungsfeld(
          allProjekts,
          editorial.forschungsfeld[0].id
        );

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

                  <ServiceElement title={t("Projekte")}>
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
