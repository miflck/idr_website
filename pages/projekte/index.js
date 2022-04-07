import { request, PROJEKTE } from "../../lib/datocms";
import Layout from "../../Components/Layout/layout";
import ListItemProjekt from "../../Components/List/listItemProjekt";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./projekte.module.scss";
import FilterElement from "../../Components/FilterElement/filterElement";
import React, { useState, useEffect, useContext } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import Lupe from "../../Components/Lupe/Lupe";
import SearchTerm from "../../Components/SearchTerm/SearchTerm";
import FilterWrapper from "../../Components/FilterWrapper/FilterWrapper";
import {
  searchInput,
  searchInputArray,
  getIntersection,
} from "../../lib/helpers";
import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";

export default function Projekte(props) {
  const {
    projekte: { allProjekts },
  } = props;
  const {
    projekte: { allForschungsfelders },
  } = props;

  const { t } = useTranslation("common");

  // context
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const [showGradient, setShowGradient] = useState(false);

  const handleShowGradient = (val) => {
    dispatch({ type: ACTIONS.SHOW_GRADIENT, payload: { showGradient: val } });
  };

  const removeAllHoverFilter = () => {
    dispatch({ type: ACTIONS.REMOVE_ALL_HOVER_FILTER });
  };

  //nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
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

  let result;
  if (filterdList.length > 0 && searchFilterdList.length > 0) {
    result = getIntersection([filterdList, searchFilterdList]);
  } else {
    result =
      filterdList.length < searchFilterdList.length
        ? searchFilterdList
        : filterdList;
  }
  console.log("result", result);

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

  // on change active filters
  useEffect(() => {
    //console.log("FILTER FROM CONTEXT  ",state.activeFilters)
    setFilterdList(filterBy(allProjekts, state.activeFilters));
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [state.activeFilters]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    const isEmpty = Object.keys(search).length === 0;
    setSearchFilterdList(searchInput(allProjekts, search));
  }, [search]);

  useEffect(() => {
    console.log(state.searchTerms);
    const isEmpty = Object.keys(state.searchTerms).length === 0;
    setSearchFilterdList(searchInputArray(allProjekts, state.searchTerms));
  }, [state.searchTerms]);

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

      <div className={styles.listwrapper}>
        {
          //filterdList.map((projekt) => {
          result.map((projekt) => {
            return (
              <ListItemProjekt
                {...projekt}
                key={projekt.id}
                showGradient={showGradient}
              />
            );
          })
        }
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const projekte = await request({
    query: PROJEKTE,
    variables: { locale: locale },
  });

  return {
    props: {
      projekte,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
