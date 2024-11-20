import { request, VERANSTALTUNGEN } from "../../lib/datocms";
import React, { useState, useEffect, useContext } from "react";
import styles from "./veranstaltungen.module.scss";
import Layout from "../../Components/Layout/layout";
// import Link from 'next/link'
// import Container from '../../Components/Container/container'
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import ForschungsfeldElement from '../../Components/ForschungsfeldElement/forschungsfeldElement'
import { AppContext, ACTIONS } from "../../context/state";
import FilterElement from "../../Components/FilterElement/filterElement";

import ListItemVeranstaltung from "../../Components/List/listItemVeranstaltung";

import Header from "../../Components/Header/header";
import StickyHeaderContainer from "../../Components/StickyHeaderContainer/StickyHeaderContainer";

import FilterWrapper from "../../Components/FilterWrapper/FilterWrapper";
import Lupe from "../../Components/Lupe/Lupe";
import { searchInputArray, getIntersection, searchInputArrayRecursive } from "../../lib/helpers";
import { SearchTermWrapper } from "../../Components";
import SearchTerm from "../../Components/SearchTerm/SearchTerm";

const Veranstaltungen = (props) => {
  const {
    veranstaltungen: { allVeranstaltungs: data },
  } = props;
  const {
    veranstaltungen: { allForschungsfelders },
  } = props;

  console.log(data);
  // console.log("props",props);
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
          return feld.id.toString().includes(term);
        });
      });
    });
  }

  const [filterdList, setFilterdList] = useState([]);
  const [searchFilterdList, setSearchFilterdList] = useState([]);
  // get data after all filters
  let result = getIntersection([filterdList, searchFilterdList]) || data;

  useEffect(() => {
    setFilterdList(filterBy(data, state.activeFilters));
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
    window.scrollTo(0, 0);
  }, [state.activeFilters]);

  // fields to search
  let fields = ["titel", "referentIn", "value"];
  const [search, setSearch] = useState("");
  useEffect(() => {
    let array = [...state.searchTerms, search];
    setSearchFilterdList(searchInputArrayRecursive(data, array, fields));
  }, [search]);

  useEffect(() => {
    setSearchFilterdList(searchInputArrayRecursive(data, state.searchTerms, fields));
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
      <StickyHeaderContainer>
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
      </StickyHeaderContainer>

      <div className={styles.listwrapper}>
        {result.map((veranstaltung) => {
          return <ListItemVeranstaltung {...veranstaltung} key={veranstaltung.id} showGradient={showGradient} />;
        })}
      </div>
    </Layout>
  );
};

export default Veranstaltungen;

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({ locale }) {
  const veranstaltungen = await request({
    query: VERANSTALTUNGEN,
    variables: { locale: locale },
  });

  return {
    props: {
      veranstaltungen,
      ...(await serverSideTranslations(locale, ["common"])),
    }, // will be passed to the page component as props
  };
}
