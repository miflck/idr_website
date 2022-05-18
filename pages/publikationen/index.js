import Layout from "../../Components/Layout/layout";
import ListItemPublikation from "../../Components/List/listItemPublikation";
import styles from "./publikationen.module.scss";
import Container from "../../Components/Container/container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useState, useEffect, useContext } from "react";
import data from "../../lib/export_arbor_JSON";
import { useRouter } from "next/router";
import FilterElement from "../../Components/FilterElement/filterElement";
import SuchFeldElement from "../../Components/SuchFeldElement/SuchFeldElement";
import { AppContext, ACTIONS } from "../../context/state";
import { PublicationFilter } from "../../lib/helpers";
import Header from "../../Components/Header/header";
import HeaderWrapper from "../../Components/HeaderWrapper/HeaderWrapper";
import { FilterWrapper } from "../../Components";
import { Lupe } from "../../Components";
import { SearchTerm } from "../../Components";
import {
  searchInput,
  searchInputArray,
  getIntersection,
  searchInputArrayRecursive,
  getForschungsfeldBFHString,
  getForschungsfeldId,
} from "../../lib/helpers";

import { request, ALLFORSCHUNGSFELDER } from "../../lib/datocms";

export default function Publikationen(props) {
  let filterfields = ["contributors", "creators"];

  const {
    data: { allForschungsfelders },
  } = props;

  // context
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

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

  const [publicationData, setPublicationData] = useState([]);
  const [showGradient, setShowGradient] = useState(false);

  const fetchPublications = async () => {
    const response = await fetch("/api/publikationen");
    /*const response = await fetch(
      "https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&eprintid=&date=&title_merge=ALL&title=&contributors_name_merge=ALL&contributors_name=&contributors_orcid=&editors_name_merge=ALL&editors_name=&publication_merge=ALL&publication=&abbrev_publication_merge=ALL&abbrev_publication=&publisher_merge=ALL&publisher=&event_title_merge=ALL&event_title=&event_location_merge=ALL&event_location=&issn=&isbn=&book_title_merge=ALL&book_title=&abstract_merge=ALL&abstract=&keywords_merge=ALL&keywords=&note_merge=ALL&note=&divisions_merge=ANY&divisions=BFH-OE--RU-0043&grad_school_merge=ANY&org_units_id_merge=ANY&org_units_id_match=IN&refereed=EITHER&doc_content_merge=ANY&doc_license_merge=ANY&doc_format_merge=ANY&doi_name=&id_fs=&doi=&pubmed_id=&wos_id=&satisfyall=ALL&order=-date%2Fcreators_name%2Ftitle"
    );*/

    const data = await response.json();
    setPublicationData(data);
    setFilterdList(data);
    setSearchFilterdList(data);
  };

  useEffect(() => {
    console.log("fetch pub");
    fetchPublications();
  }, []);

  useEffect(() => {
    console.log("publicationData", publicationData);
  }, [publicationData]);

  const { t } = useTranslation("common");

  const router = useRouter();
  // console.log("roter nach type", router.asPath.split(/=/)[1])
  //var deliveredfilter = router.asPath.split(/=/)[1]

  let deliveredfilter = router.query.keyword;

  // ternary expression = if else shorthand
  let initState =
    typeof deliveredfilter === "undefined" || !deliveredfilter
      ? []
      : new Array(deliveredfilter);
  const [filter, setFilter] = useState(initState);

  //nach Publikationstypen filtern
  function filterBy(data, filterterms) {
    if (filterterms.length < 1) return publicationData; // wenn kein filter ist gibt some leer zurück
    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.some((term) => {
        let filter = PublicationFilter.find((o) => o.id === term);
        //return obj.type.toString() === filter.term;

        return obj.divisions.includes(getForschungsfeldBFHString(term));
      });
    });
  }

  const [filterdList, setFilterdList] = useState([]);
  const [searchFilterdList, setSearchFilterdList] = useState([]);

  let result =
    getIntersection([filterdList, searchFilterdList]) || publicationData;

  useEffect(() => {
    setFilterdList(filterBy(publicationData, state.activeFilters));
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [state.activeFilters]);

  // fields to search
  let fields = ["event_title", "title", "contributors", "creators"];

  const [search, setSearch] = useState();
  useEffect(() => {
    let array = [...state.searchTerms, search];
    if (array.length < 0) return;
    setSearchFilterdList(
      searchInputArrayRecursive(publicationData, array, fields)
    );
  }, [search]);

  useEffect(() => {
    setSearchFilterdList(
      searchInputArrayRecursive(publicationData, state.searchTerms, fields)
    );
  }, [state.searchTerms]);

  function groupByFlat(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      if (!acc[obj[property]]) {
        acc[obj[property]] = [];
      }
      acc[obj[property]].push(obj);
      return acc;
    }, {});
  }

  // currently not used
  let typeList = groupByFlat(publicationData, "type");
  //console.log("Type List ", typeList);
  const publicationTypes = Object.keys(typeList);
  //console.log("publicationTypes ", publicationTypes);

  /*

  //geht noch nicht, andere Strukturen, andere Loops
  aber component ist schon mal drin zu SuchFeldElement
// Lupenfilter muss ins Textfeld, Forschungsfeld, Titel
  function searchInput(data, inputvalue,filterfields) {
    console.log("search", data)
    return data.filter((obj) => {
      console.log("Object.keys(obj)",Object.keys(obj))

        return Object.keys(obj).some((key)=>{

          if(filterfields.indexOf(key)>-1){
            console.log("key",key)

            }

          // objekte?
          if(typeof obj[key] !=='undefined' ){
            console.log("obj key",obj[key])

					}

        
        // array
        /*  if(Array.isArray(obj[key])){

          return obj[key].some((entry)=>{
            return Object.keys(entry).some((kkey=>{
              return entry[kkey].toString().includes(inputvalue);
            }))
          })
        }

*/
  /*

        else{
          return obj[key].toString().toLowerCase().includes(inputvalue.toLowerCase());
        }
      })
      }
    )
  }
  
  const [search, setSearch] = useState('')
  useEffect(() => {
  setFilterdList(searchInput(publicationdata,search,filterfields));
  },[search])
  */

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

      {/* <SuchFeldElement setSearch={setSearch}/> */}

      <div className={styles.listwrapper}>
        {result.map((publikation) => {
          let felder = [];
          publikation.divisions.map((division) => {
            if (getForschungsfeldId(division)) {
              let result = allForschungsfelders.filter((obj) => {
                return obj.id == getForschungsfeldId(division);
              });
              felder.push(...result);
            }
          });
          return (
            <ListItemPublikation
              {...publikation}
              forschungsfeld={[...felder]}
              key={publikation.id}
              showGradient={showGradient}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const data = await request({
    query: ALLFORSCHUNGSFELDER,
    variables: { locale: locale },
  });

  //const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
  //const publicationdata = await res.json()
  const publicationdata = "";

  return {
    props: {
      data,
      publicationdata,
      ...(await serverSideTranslations(locale, ["common"])),
    }, // will be passed to the page component as props
  };
}

// export async function getStaticPaths() {
// }
