import { request, PROJEKTE } from "../../lib/datocms";
import Layout from "../../Components/Layout/layout";
import ListItemProjekt from "../../Components/List/listItemProjekt";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "./projekte.module.scss";
import FilterElement from "../../Components/FilterElement/filterElement";
import React, { useState, useEffect, useContext } from "react";
import { AppContext, ACTIONS } from "../../context/state";
import SuchFeldElement from "../../Components/SuchFeldElement/SuchFeldElement";
import Lupe from "../../Components/Lupe/Lupe";
import SearchTerm from "../../Components/SearchTerm/SearchTerm";

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
    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.every((term) => {
        return obj.forschungsfeld.some((feld) => {
          return feld.id.toString().includes(term);
        });
      });
    });
  }

  const [filterdList, setFilterdList] = useState([]);
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
          console.log("in ", inputvalue);
          return obj[key]
            .toString()
            .toLowerCase()
            .includes(inputvalue.toLowerCase());
        }
      });
    });
  }

  // Lupenfilter muss ins Textfeld, Forschungsfeld, Titel
  function searchInputArray(data, searchKeyArray) {
    return data.filter((obj) => {
      // some für oder, every für und
      return searchKeyArray.every(function (searchKey) {
        return Object.keys(obj).some((key) => {
          if (Array.isArray(obj[key])) {
            return obj[key].some((entry) => {
              return Object.keys(entry).some((kkey) => {
                return entry[kkey].toString().includes(searchKey);
              });
            });
          } else {
            return obj[key]
              .toString()
              .toLowerCase()
              .includes(searchKey.toLowerCase());
          }
        });
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

  const [search, setSearch] = useState("");
  useEffect(() => {
    // dont perform on first render…
    const isEmpty = Object.keys(search).length === 0;
    //  if (!isEmpty) setFilterdList(searchInput(allProjekts, search));
  }, [search]);

  useEffect(() => {
    console.log(state.searchTerms);
    const isEmpty = Object.keys(state.searchTerms).length === 0;

    // if (!isEmpty)
    setFilterdList(searchInputArray(allProjekts, state.searchTerms));
  }, [state.searchTerms]);

  return (
    <Layout
      setMainColor={props.setMainColor}
      setSecondColor={props.setSecondColor}
      colorHexCode={props.colorHexCode}
      colorHexCodeSecond={props.colorHexCodeSecond}
    >
      <Lupe setSearch={setSearch} handleKeyDown={handleKeyDown}></Lupe>
      <FilterElement filterarray={allForschungsfelders} />
      {state.searchTerms.map((term, index) => {
        return <SearchTerm key={index} term={term}></SearchTerm>;
      })}

      <div className={styles.listwrapper}>
        {filterdList.map((projekt) => {
          return (
            <ListItemProjekt
              {...projekt}
              key={projekt.id}
              showGradient={showGradient}
            />
          );
        })}
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
