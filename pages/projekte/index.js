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
  searchInputArrayRecursive,
} from "../../lib/helpers";
import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";

export default function Projekte(props) {
  const {
    projekte: { allProjekts: data },
  } = props;
  const {
    projekte: { allForschungsfelders },
  } = props;

  console.log(allForschungsfelders);
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

  // get data after all filters
  let result = getIntersection([filterdList, searchFilterdList]) || data;
  console.log(filterdList, searchFilterdList, result);

  // on change active filters
  useEffect(() => {
    setFilterdList(filterBy(data, state.activeFilters));
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [state.activeFilters]);

  // fields to search
  let fields = ["titel", "name", "value"];

  const [search, setSearch] = useState("");
  useEffect(() => {
    let array = [...state.searchTerms, search];
    setSearchFilterdList(searchInputArrayRecursive(data, array, fields));
  }, [search]);

  useEffect(() => {
    console.log(state.searchTerms);
    setSearchFilterdList(
      searchInputArrayRecursive(data, state.searchTerms, fields)
    );
    console.log(
      "use effect ",
      searchInputArrayRecursive(data, state.searchTerms, fields)
    );
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
