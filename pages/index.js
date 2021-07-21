import { request, NEWS } from "../lib/datocms";
// import styles from '../styles/Home.module.scss'
import styles from './news.module.scss'
import Layout from '../components/Layout/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import TextElement from '../components/TextElement/TextElement'
import React, { useState, useEffect,useContext } from 'react'

import { AppContext,ACTIONS } from '../context/state';

export default function Home(props) {
  const {newsseite:{newsseite:{links}}}=props;
  const {newsseite:{allForschungsfelders}}=props;
  // console.log("homeprops", links);
  const { t } = useTranslation('common')

  // context
  const globalState = useContext(AppContext);
  const { dispatch } = globalState;
	const handleShowGradient = (val) => {
    dispatch({ type: ACTIONS.SHOW_GRADIENT, payload:{showGradient:val} }) 
	};

  //nach Forschungsfelder filtern
function filterBy(data, filterterms) {
  return data.filter((obj) => {
    //kann sein: every für && und some für || ? 
    return filterterms.every((term)=>{
      return obj.forschungsfeld.some((feld)=>{
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
  else{
    setFilter([...filter, item])
  }
}

const [filterdList, setFilterdList] = useState([])

useEffect(() => {
setFilterdList (filterBy(links, filter) )
},[filter])

let FilterElement;
if(filter) {
  FilterElement =  <div className={styles.filterfeldwrapper}>
                    <div className={styles.deaktivieren}> <a onClick={() => setFilter([])}> {t("Deaktivieren")} </a> </div>
                    <div className={styles.filterauflistung}>
                      {allForschungsfelders.map((forschungsfeld) =>{
                        let btn_class;
                        if(filter.includes(forschungsfeld.titel)) {
                          btn_class = styles.forschungsfeldaktiv
                        }
                        else {
                          btn_class = styles.forschungsfeld
                        }
                        return(
                          <span className={btn_class}>
                            <a 
                            onClick={() => addMoreItem(forschungsfeld.titel)}
                            key={forschungsfeld.titel}
                            > 
                              {forschungsfeld.titel} 
                          </a>
                          </span>
                        )})}
                    </div>
                    </div>
}

  return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
      
      {FilterElement}

      <main className={styles.container}>
      <div className={styles.allekacheln}>
        {filterdList.map((beitrag) => {

          let hrefprojekte=`/projekte`
          if(beitrag._modelApiKey === 'projekt') {
            hrefprojekte+=`/${beitrag.slug}`
          }
          let hrefveranstaltungen=`/veranstaltungen`
          if(beitrag._modelApiKey === 'veranstaltung') {
            hrefveranstaltungen+=`/${beitrag.slug}`
          }

          const date = new Date(beitrag.datum).toLocaleString([], {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit'});

            // console.log("_modelApiKey", beitrag._modelApiKey)
            let ImageElement;
            if (beitrag.image != null) {
              ImageElement =  <div className={styles.bild}>
                                <img
                                  className={styles.image}
                                  src={beitrag.image.url}
                                />
                              </div>
            }
            else {
              ImageElement = <></>
            }


            let colors=[];
            beitrag.forschungsfeld.map((forschungsfeld) => {
            colors.push(forschungsfeld.colour.hex)
            })

            let background_style={
                background: `linear-gradient(to right,"white"})`,
                animation:`${styles.fadeOut} 0.5s ease`
            };

            let background_style_small={
                background: `linear-gradient(to right,"white"})`,
                animation:`${styles.fadeOut} 0.5s ease`,
            };


            let ForschungsfeldElement;
            if (beitrag.forschungsfeld != null) {
              ForschungsfeldElement = <div className={styles.forschungsfeldwrapper}>
                                          {beitrag.forschungsfeld.map((forschungsfeld) => {
                                            let btn_class;
                                            // console.log("filter zeile 140",filter)
                                            if(filter.includes(forschungsfeld.titel)) {
                                              btn_class = styles.forschungsfeldaktiv
                                              background_style_small={
                                                background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
                                                opacity:1,
                                                animation:`${styles.fadeIn} 0.2s ease`
                                              }
                                            }
                                            else {
                                              btn_class = styles.forschungsfeld
                                            }
                                            return (
                                                <span 
                                                className={btn_class}
                                                // className={styles.forschungsfeld}
                                                >
                                                    <a
                                                    onClick={() => addMoreItem(forschungsfeld.titel)}
                                                    key={forschungsfeld.id}
                                                    > 
                                                      {forschungsfeld.titel} 
                                                    </a>
                                                </span>
                                            )
                                          })}
                                      </div>
            }


              return(
                <div className={styles.kachelwrapper} key={beitrag.id}>
                    {
                    beitrag._modelApiKey === 'projekt' &&
                    
                      <div className={styles.kachel} style={background_style_small} onMouseEnter={ ()=>handleShowGradient(true)} onMouseLeave={ ()=>handleShowGradient(false)}>
                        <div className={styles.text}>
                          <div className={styles.uebertitel}>{t("Projekt")}</div>
                          <Link href={hrefprojekte}>
                            <div className={styles.titel}>{beitrag.titel}</div>
                          </Link>
                          <TextElement {...beitrag.newstext}/>
                         {ForschungsfeldElement}

                        </div>
                      </div>
                    }
                    {
                      beitrag._modelApiKey === 'veranstaltung' &&
                      
                        <div className={styles.kachel} style={background_style_small}>
                          <div className={styles.text}>
                            <div className={styles.uebertitel}>{t("Veranstaltung")}</div>
                            <Link href={hrefveranstaltungen}>
                              <div className={styles.titel}>{beitrag.titel}</div>
                            </Link>
                            <div className={styles.date}>{date} {t("Uhr")}</div>
                            {ForschungsfeldElement}
                          </div>
                        </div>
                    }
                    {
                      beitrag._modelApiKey === 'news' &&
                        <div className={styles.kachel} style={background_style_small}>
                            <div className={styles.text}>
                              <div className={styles.uebertitel}>{t("News")}</div>
                              <Link href={beitrag.weblink}>
                                <div className={styles.titel}>{beitrag.titel}</div>
                              </Link>
                              <TextElement {...beitrag.text}/>
                              <Link href={beitrag.weblink}>
                                <div className={styles.weblink}>{t("Publilink")}</div>
                              </Link>
                              {ForschungsfeldElement}
                            </div> 
                            {ImageElement}
                        </div>
                    }
                </div>
              )
              })}
        </div>
     
    </main>
    </Layout>
  )
}


export async function getStaticProps({locale}) {
  const newsseite = await request({
    query: NEWS, variables: {locale:locale},
  });

  return {
    props: {
      newsseite,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}