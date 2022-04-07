import { request, MENSCHEN } from "../../lib/datocms";
import styles from "./team.module.scss";
import Layout from "../../Components/Layout/layout";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useContext } from "react";
import FilterElement from "../../Components/FilterElement/filterElement";
// import ForschungsfeldElement from "../../Components/ForschungsfeldElement/forschungsfeldElement";
import ListItemTeam from "../../Components/List/listItemTeam";
import { AppContext, ACTIONS } from "../../context/state";
import SuchFeldElement from "../../Components/SuchFeldElement/SuchFeldElement";
import Container from "../../Components/Container/container";

import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";

import { SpacedWrapper } from "../../Components/Composition";
import { ModularContentWrapper } from "../../Components/Composition";
import FilterWrapper from "../../Components/FilterWrapper/FilterWrapper";
import Lupe from "../../Components/Lupe/Lupe";
import { searchInputArray } from "../../lib/helpers";
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

  const allFilter = allForschungsfelders.concat(allFunktions);

  const { t } = useTranslation("common");

  console.log("team", allFilter);

  // context
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;
  const [showGradient, setShowGradient] = useState(false);

  const handleShowGradient = (val) => {
    dispatch({ type: ACTIONS.SHOW_GRADIENT, payload: { showGradient: val } });
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

  const getIntersection = (arrays) => {
    return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
  };

  const addMoreItem = (item) => {
    const copyfilter = [...filter];
    var index = copyfilter.indexOf(item);
    if (index !== -1) {
      copyfilter.splice(index, 1);
      setFilter([...copyfilter]);
    } else {
      setFilter([...filter, item]);
    }
  };

  const [filterdList, setFilterdList] = useState([]);

  // on change active filters
  useEffect(() => {
    console.log("FILTER FROM CONTEXT  ", state.activeFilters);
    let filterdForschungsfelder = filterByKeys(
      allMenschens,
      state.activeFilters,
      ["forschungsfeld"]
    );
    let filterdFunktionen = filterByKeys(allMenschens, state.activeFilters, [
      "funktion",
    ]);

    let result;

    if (filterdForschungsfelder.length > 0 && filterdFunktionen.length > 0) {
      result = getIntersection([filterdForschungsfelder, filterdFunktionen]);
    } else {
      result =
        filterdForschungsfelder.length < filterdFunktionen.length
          ? filterdFunktionen
          : filterdForschungsfelder;
    }

    console.log(filterdForschungsfelder, filterdFunktionen, result);

    setFilterdList(result);
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [state.activeFilters]);

  // on change active filters
  useEffect(() => {
    console.log("use Effect from Team", state.activeFilters);
    //console.log("FILTER FROM CONTEXT  ",state.activeFilters)
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
  }, []);

  // Lupenfilter muss ins Textfeld, Forschungsfeld, Titel
  function searchInput(data, inputvalue) {
    return data.filter((obj) => {
      return Object.keys(obj).some((key) => {
        if (Array.isArray(obj[key])) {
          return obj[key].some((entry) => {
            return Object.keys(entry).some((kkey) => {
              if (
                typeof entry[key] === "string" ||
                entry[key] instanceof String
              ) {
                return entry[kkey]
                  .toString()
                  .toLowerCase()
                  .includes(inputvalue.toLowerCase());
              }
            });
          });
        } else {
          if (typeof obj[key] === "string" || obj[key] instanceof String) {
            return obj[key]
              .toString()
              .toLowerCase()
              .includes(inputvalue.toLowerCase());
          }
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
    console.log("state Search terms", state.searchTerms);
    const isEmpty = Object.keys(state.searchTerms).length === 0;
    // if (!isEmpty)
    setFilterdList(searchInputArray(allMenschens, state.searchTerms));
  }, [state.searchTerms]);

  const [search, setSearch] = useState("");
  useEffect(() => {
    const isEmpty = Object.keys(search).length === 0;
    if (!isEmpty) setFilterdList(searchInput(allMenschens, search));
  }, [search]);

  /*
      let neueListe=[];
      allForschungsfelders.map((forschungsfeld) => {
        neueListe.push(forschungsfeld)
      })
      allFunktions.map((forschungsfeld) => {
        neueListe.push(forschungsfeld)
      })
  */
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
      {state.searchTerms.length > 0 && (
        <SearchTermWrapper>
          {state.searchTerms.map((term, index) => {
            return <SearchTerm key={index} term={term}></SearchTerm>;
          })}
        </SearchTermWrapper>
      )}
      {/* <FilterElement filterarray={neueListe} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter}/>*/}
      {/** <FilterElement filterarray={allFilter} /> */}

      <div className={styles.teamcontainer}>
        {filterdList.map((mensch) => {
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
            <h2>{t("Ehemalige und Gastforscherinnen")}</h2>
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
