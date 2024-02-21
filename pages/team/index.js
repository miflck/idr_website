import { request, MENSCHEN } from "../../lib/datocms";
import styles from "./team.module.scss";
import Layout from "../../Components/Layout/layout";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useContext } from "react";
import FilterElement from "../../Components/FilterElement/filterElement";
import ListItemTeam from "../../Components/List/listItemTeam";
import { AppContext, ACTIONS } from "../../context/state";
import Container from "../../Components/Container/container";

import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";

import { SpacedWrapper } from "../../Components/Composition";
import { ModularContentWrapper } from "../../Components/Composition";
import FilterWrapper from "../../Components/FilterWrapper/FilterWrapper";
import Lupe from "../../Components/Lupe/Lupe";
import {
  searchInput,
  searchInputArray,
  getIntersection,
} from "../../lib/helpers";
import { SearchTermWrapper } from "../../Components";
import SearchTerm from "../../Components/SearchTerm/SearchTerm";

const Team = (props) => {
  const {
    menschen: { allMenschens },
  } = props;
  const {
    menschen: { allForschungsfelders },
  } = props;
  const {
    menschen: { allFunktions },
  } = props;

  const { t } = useTranslation("common");

  // context
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;
  const [showGradient, setShowGradient] = useState(false);

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

  //nach Felder filtern, ||
  function filterByKeys(data, filterterms, keys) {
    if (filterterms.length == 0) return data; // am anfang ohne filterdata
    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.some((term) => {
        return keys.some((key) => {
          return obj[key].some((feld) => {
            return feld.id.toString().includes(term);
          });
        });
      });
    });
  }

  const [filterdList, setFilterdList] = useState([]);
  const [searchFilterdList, setSearchFilterdList] = useState([]);

  let filterdForschungsfelder = filterByKeys(
    allMenschens,
    state.activeFilters,
    ["forschungsfeld"]
  );
  let filterdFunktionen = filterByKeys(allMenschens, state.activeFilters, [
    "funktion",
  ]);

  let resultFilter, result;

  if (filterdForschungsfelder.length > 0 && filterdFunktionen.length > 0) {
    resultFilter = getIntersection([
      filterdForschungsfelder,
      filterdFunktionen,
    ]);
  } else {
    resultFilter =
      filterdForschungsfelder.length < filterdFunktionen.length
        ? filterdFunktionen
        : filterdForschungsfelder;
  }
  result = getIntersection([resultFilter, searchFilterdList]);

  // on change active filters
  useEffect(() => {
    setFilterdList(
      filterByKeys(allMenschens, state.activeFilters, [
        "forschungsfeld",
        "funktion",
      ])
    );
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
    window.scrollTo(0, 0);
  }, [state.activeFilters]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: ACTIONS.ADD_SEARCHTERM,
        payload: { element: e.currentTarget.value },
      });
    }
  };

  const handleSubmit = (e) => {
    dispatch({
      type: ACTIONS.ADD_SEARCHTERM,
      payload: { element: e },
    });
  };

  useEffect(() => {
    const isEmpty = Object.keys(state.searchTerms).length === 0;
    setSearchFilterdList(searchInputArray(allMenschens, state.searchTerms));
  }, [state.searchTerms]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    const isEmpty = Object.keys(search).length === 0;
    if (!isEmpty) setSearchFilterdList(searchInput(allMenschens, search));
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
          <FilterElement filterarray={allFunktions} />
          <div
            className="break"
            style={{ flexBasis: "100%", height: "0" }}
          ></div>
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

      <div className={styles.teamcontainer}>
        {result.map((mensch) => {
          if (mensch.aktiv && !mensch.extern) {
            return (
              <ListItemTeam
                {...mensch}
                showGradient={showGradient}
                key={mensch.id}
              />
            );
          }
        })}
      </div>

      <Container>
        <SpacedWrapper>
          <ModularContentWrapper>
            <h2>{t("Ehemalige und Gastforscher*innen")}</h2>
            <br></br>
            <div className={styles.ehemalige}>
              {filterdList.map((mensch) => {
                if (!mensch.aktiv && !mensch.extern) {
                  return <div key={mensch.id}>{mensch.name}</div>;
                }
              })}
            </div>
          </ModularContentWrapper>
        </SpacedWrapper>
      </Container>
    </Layout>
  );
};

export default Team;

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({ locale }) {
  const menschen = await request({
    query: MENSCHEN,
    variables: { locale: locale },
  });

  return {
    props: {
      menschen,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
