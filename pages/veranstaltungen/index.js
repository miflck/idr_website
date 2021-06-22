import { request,VERANSTALTUNGEN } from "../../lib/datocms"
import React, { useState, useEffect } from 'react'
import styles from './veranstaltungen.module.scss'
import Layout from '../../components/Layout/layout'
import Link from 'next/link'
import Container from '../../components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextElement from "../../components/TextElement/TextElement"

const Veranstaltungen =(props)=>{
  const {veranstaltungen:{allVeranstaltungs}}=props;
  const {veranstaltungen:{allForschungsfelders}}=props;
    // console.log("props",props);
    const { t } = useTranslation('common')

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
      else {
        setFilter([...filter, item])
      }
    }

    const [filterdList, setFilterdList] = useState([])

    useEffect(() => {
      setFilterdList (filterBy(allVeranstaltungs, filter) )
    },[filter])


    let FilterElement;
    if(filter) {
      FilterElement =  <div className={styles.filterfeldwrapper} >
                        <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > alle Filter deaktivieren </a> </div>
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


    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
        {FilterElement}
        
        <div className={styles.veranstaltungswrapper} >
            {filterdList.map((veranstaltung) => {
              let href=`/veranstaltungen`
              if(veranstaltung.slug!=""){
                  href+=`/${veranstaltung.slug}`
              }
              let ForschungsfeldElement;
                  if(filter) {
                      ForschungsfeldElement = <div className={styles.forschungsfeldwrapper}>
                          {veranstaltung.forschungsfeld.map((forschungsfeld) => {
                              let btn_class;
                              if(filter.includes(forschungsfeld.titel)) {
                                btn_class = styles.forschungsfeldaktiv
                              }
                              else {
                                btn_class = styles.forschungsfeld
                              }
                              return (
                                  <span className={btn_class}>
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
                const datum = new Date(veranstaltung.datum).toLocaleString([], {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit'});
                    return(
                    <Link href={href}>
                      <div className={styles.veranstaltungslink}>
                        <div className={styles.veranstaltungscontent} key={veranstaltung.id}>
                              <Container>
                              <div className={styles.title}>{veranstaltung.titel}</div>
                              <div className={styles.referentIn}>{veranstaltung.referentIn}</div>
                              <div className={styles.zentriert}>
                                  <div className={styles.datum}>{datum} Uhr</div>
                                  <div className={styles.untertitel}>{veranstaltung.untertitel}</div>
                                  <div className={styles.organisation}>{veranstaltung.organisation}</div>
                              </div>
                              <div className={styles.beschreibung}>
                                <TextElement {...veranstaltung.beschreibung}></TextElement>
                              </div>
                              {ForschungsfeldElement}
                              </Container>
                        </div>
                       </div>
                    </Link>
                    )
            })}
        </div>
      </Layout>
    )
}

export default Veranstaltungen;


// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
    const veranstaltungen = await request({
        query: VERANSTALTUNGEN,  variables: {locale:locale},
      });

    return {
      props: {
        veranstaltungen,
        ...await serverSideTranslations(locale, ['common']),
      }, // will be passed to the page component as props
    }
  }

 

