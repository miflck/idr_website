import { request, ALLNEWS } from "../lib/datocms";
import styles from './news.module.scss'
import Layout from '../Components/Layout/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext, ACTIONS } from '../context/state';
import FilterElement from "../Components/FilterElement/filterElement";
import ListItemNews from "../Components/List/listItemNews";
import SuchFeldElement from "../Components/SuchFeldElement/SuchFeldElement";
import TileGrid from "../Components/Composition/TileGrid/TileGrid";
import { Tile } from "../Components";

export default function Home(props) {
  const { news: { allNews:siteData } } = props;
  const { news: { allForschungsfelders } } = props;

  // console.log("homeprops", links);
  const { t } = useTranslation('common')

  // context
  const globalState = useContext(AppContext);
  const { dispatch } = globalState;
  const {state}=globalState

  const [showGradient,setShowGradient]=useState(false);

  const handleShowGradient = (val) => {
    dispatch({ type: ACTIONS.SHOW_GRADIENT, payload: { showGradient: val } })
  };

  //nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
    return data.filter((obj) => {
      //kann sein: every für && und some für || ? 
      return filterterms.every((term) => {
        return obj.forschungsfeld.some((feld) => {
          return feld.id.toString().includes(term);
        })
      })
    })
  }

  const [filter, setFilter] = useState([])

  const addMoreItem = (item) => {
    const copyfilter = [...filter]
    var index = copyfilter.indexOf(item);
    if (index !== -1) {
      copyfilter.splice(index, 1);
      setFilter([...copyfilter])
    }
    else {
      setFilter([...filter, item])
    }
  }

  const [filterdList, setFilterdList] = useState([])

  useEffect(() => {
    console.log("active filter",state.activeFilters,siteData)
    setFilterdList(filterBy(siteData, state.activeFilters))
    if(state.activeFilters.length>0){
      setShowGradient(true)
    }else{
      setShowGradient(false)
    }
  }, [state.activeFilters])

  // Lupenfilter muss ins Textfeld, Forschungsfeld, Titel, News etc funktioniert noch nicht, Loops sind falsch
function searchInput(data, inputvalue) {
  return data.filter((obj) => {
      return Object.keys(obj).some((key)=>{
      if(Array.isArray(obj[key])){
        return obj[key].some((entry)=>{
          return Object.keys(entry).some((kkey=>{
            return entry[kkey].toString().includes(inputvalue);
          }))
        })
      }
      else{
        return obj[key].toString().toLowerCase().includes(inputvalue.toLowerCase());
      }
    })
    }
  )
  }

  const [search, setSearch] = useState('')
  useEffect(() => {
    setFilterdList(searchInput(siteData,search));
  },[search])

  return (

    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>

      <SuchFeldElement setSearch={setSearch}/>

      <FilterElement filterarray={allForschungsfelders} />

        <TileGrid>
          
          {filterdList.map((beitrag) => {
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
                        key={beitrag.id}/>
            </Tile>
            )
          }
            )
          }
          </TileGrid>

    </Layout>
    
  )
}


export async function getStaticProps({ locale }) {
  const news = await request({
    query: ALLNEWS, variables: { locale: locale },
  });

  return {
    props: {
      news,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}