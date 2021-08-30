import { request, NEWS } from "../lib/datocms";
import styles from './news.module.scss'
import Layout from '../Components/Layout/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect, useContext } from 'react'
import { AppContext, ACTIONS } from '../context/state';
import FilterElement from "../Components/FilterElement/filterElement";
import ListItemNews from "../Components/List/listItemNews";

export default function Home(props) {
  const { newsseite: { newsseite: { links } } } = props;
  const { newsseite: { allForschungsfelders } } = props;
  // console.log("homeprops", links);
  const { t } = useTranslation('common')

  // context
  const globalState = useContext(AppContext);
  const { dispatch } = globalState;
  const handleShowGradient = (val) => {
    dispatch({ type: ACTIONS.SHOW_GRADIENT, payload: { showGradient: val } })
  };

  //nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
    return data.filter((obj) => {
      //kann sein: every für && und some für || ? 
      return filterterms.every((term) => {
        return obj.forschungsfeld.some((feld) => {
          return feld.titel.toString().includes(term);
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
    setFilterdList(filterBy(links, filter))
  }, [filter])

  return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>

      <FilterElement props={allForschungsfelders} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter} />

      <main className={styles.container}>
        <div className={styles.allekacheln}>
          {filterdList.map((beitrag) => {
            return (
              <ListItemNews {...beitrag} setFilter={setFilter} filter={filter} addMoreItem={addMoreItem} 
              handleShowGradient={handleShowGradient} key={beitrag.id}/>
            )
          })}
        </div>

      </main>
    </Layout>
  )
}


export async function getStaticProps({ locale }) {
  const newsseite = await request({
    query: NEWS, variables: { locale: locale },
  });

  return {
    props: {
      newsseite,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}