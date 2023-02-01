import { request, ALLNEWS } from "../../lib/datocms";
import styles from "./news.module.scss";
import Layout from "../../Components/Layout/layout";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useContext } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import FilterElement from "../../Components/FilterElement/filterElement";
import ListItemNews from "../../Components/List/listItemNews";
import TileGrid from "../../Components/Composition/TileGrid/TileGrid";
import { Tile } from "../../Components";

import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";

import Lupe from "../../Components/Lupe/Lupe";
import SearchTerm from "../../Components/SearchTerm/SearchTerm";
import { SearchTermWrapper } from "../../Components";
import FilterWrapper from "../../Components/FilterWrapper/FilterWrapper";
import { searchInputArrayRecursive, searchRecursive, getIntersection } from "../../lib/helpers";

import { Checkboard } from "react-color/lib/components/common";

export default function Home(props) {
  const {
    news: { allNews: siteData },
  } = props;
  const {
    news: { allForschungsfelders },
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

  //nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
    if (filterterms.length < 1) return data; // wenn kein filter ist gibt some leer zurück

    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.some((term) => {
        return obj.forschungsfeld.some((feld) => {
          //return feld.id.toString().includes(term);
          return feld.id === term;
        });
      });
    });
  }

  const [filter, setFilter] = useState([]);

  const [filterdList, setFilterdList] = useState([]);
  const [searchFilterdList, setSearchFilterdList] = useState([]);

  let result = getIntersection([filterdList, searchFilterdList]) || siteData;

  useEffect(() => {
    setFilterdList(filterBy(siteData, state.activeFilters));
    console.log(filterBy(siteData, state.activeFilters));
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [state.activeFilters]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    let array = [...state.searchTerms, search];
    setSearchFilterdList(searchInputArrayRecursive(siteData, array, ["text", "titel", "value"]));
  }, [search]);

  useEffect(() => {
    console.log(state.searchTerms);
    const isEmpty = Object.keys(state.searchTerms).length === 0;
    setSearchFilterdList(searchInputArrayRecursive(siteData, state.searchTerms, ["text", "titel", "value"]));
  }, [state.searchTerms]);

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
      payload: { element: e.currentTarget.value },
    });
  };

  return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
      <HeaderWrapper>
        <Header></Header>
        <FilterWrapper>
          <FilterElement filterarray={allForschungsfelders} />

          <Lupe setSearch={setSearch} handleKeyDown={handleKeyDown} handleSubmit={handleSubmit}></Lupe>
        </FilterWrapper>
        <SearchTermWrapper>
          {state.searchTerms.map((term, index) => {
            return <SearchTerm key={index} term={term}></SearchTerm>;
          })}
        </SearchTermWrapper>
      </HeaderWrapper>

      {/*
      <TileGrid>
        {result.map((beitrag) => {
          return (
            <Tile>
              <ListItemNews
                id={beitrag.id}
                title={beitrag.title}
                image={beitrag.image}
                text={beitrag.text}
                link={beitrag.internerLink}
                forschungsfelder={beitrag.forschungsfeld}
                showGradient={showGradient}
                key={beitrag.id}
              />
            </Tile>
          );
        })}
      </TileGrid>

      */}
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const news = await request({
    query: ALLNEWS,
    variables: { locale: locale },
  });

  return {
    props: {
      news,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
