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

export default function Publikationen(props) {
  let filterfields = ["contributors", "creators"];

  // context
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const [publicationData, setPublicationData] = useState([]);
  const [showGradient, setShowGradient] = useState(false);

  const fetchPublications = async () => {
    //const response = await fetch("/api/publikationen");
    const response = await fetch(
      "https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&eprintid=&date=&title_merge=ALL&title=&contributors_name_merge=ALL&contributors_name=&contributors_orcid=&editors_name_merge=ALL&editors_name=&publication_merge=ALL&publication=&abbrev_publication_merge=ALL&abbrev_publication=&publisher_merge=ALL&publisher=&event_title_merge=ALL&event_title=&event_location_merge=ALL&event_location=&issn=&isbn=&book_title_merge=ALL&book_title=&abstract_merge=ALL&abstract=&keywords_merge=ALL&keywords=&note_merge=ALL&note=&divisions_merge=ANY&divisions=BFH-OE--RU-0043&grad_school_merge=ANY&org_units_id_merge=ANY&org_units_id_match=IN&refereed=EITHER&doc_content_merge=ANY&doc_license_merge=ANY&doc_format_merge=ANY&doi_name=&id_fs=&doi=&pubmed_id=&wos_id=&satisfyall=ALL&order=-date%2Fcreators_name%2Ftitle"
    );

    const data = await response.json();
    setPublicationData(data);
    setFilterdList(data);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

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
    return data.filter((obj) => {
      //kann sein: every für && und some für || ?
      return filterterms.every((term) => {
        let filter = PublicationFilter.find((o) => o.id === term);
        return obj.type.toString() === filter.term;
      });
    });
  }

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

  useEffect(() => {
    setFilterdList(filterBy(publicationData, state.activeFilters));
    if (state.activeFilters.length > 0) {
      setShowGradient(true);
    } else {
      setShowGradient(false);
    }
  }, [state.activeFilters]);

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

  const makeUppercase = (sentence) => {
    let words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  };

  let neueListe = [];
  publicationTypes.map((publicationtype, i) => {
    const type = {
      titel: makeUppercase(publicationtype.split("_").join(" ")),
      id: i,
      colour: { hex: "#FF0000" },
    };
    neueListe.push(type);
  });

  const [search, setSearch] = useState("");
  useEffect(() => {
    setFilterdList(searchInput(publicationData, search));
  }, [search]);

  console.log("list", filterdList);

  return (
    <Layout
      setMainColor={props.setMainColor}
      setSecondColor={props.setSecondColor}
      colorHexCode={props.colorHexCode}
      colorHexCodeSecond={props.colorHexCodeSecond}
    >
      <SuchFeldElement setSearch={setSearch} />
      <FilterElement filterarray={PublicationFilter} />

      {/* <SuchFeldElement setSearch={setSearch}/> */}

      <div className={styles.listwrapper}>
        {filterdList.map((publikation) => {
          console.log(publikation);
          return (
            <ListItemPublikation
              {...publikation}
              showGradient={showGradient}
              key={publikation.id}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  // const publikationen = await request({
  //     query: PUBLIKATIONEN, variables: {locale:locale},
  //   });

  //const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
  //const publicationdata = await res.json()
  const publicationdata = "";

  return {
    props: {
      // publikationen,
      publicationdata,
      ...(await serverSideTranslations(locale, ["common"])),
    }, // will be passed to the page component as props
  };
}

// export async function getStaticPaths() {
// }
