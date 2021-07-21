import { request,EDITORIALTEXTE } from "../lib/datocms";
import styles from './editorial.module.scss'
import Layout from '../components/Layout/layout'
import Container from '../components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextElement from '../components/TextElement/TextElement'
import ButtonLink from '../components/ButtonLink/ButtonLink'
import React, { useState, useEffect } from 'react'

import { useRouter } from 'next/router'

const Editorial =(props)=>{
  const {editorialtexte:{allEditorials}}=props;
  const {editorialtexte:{allProjekts}}=props;
  const {editorialtexte:{allForschungsfelders}}=props;
  const { t } = useTranslation('common')

  const router = useRouter()
  // console.log("roter nach type", router.asPath.split(/=/)[1])
  if(router.asPath.includes("keyword")){
    var routerfilter = router.asPath.split(/=/)[1]
    var deliveredfilter = routerfilter.split('-').join(' ')
    // console.log("deliveredfilter", deliveredfilter)
  } 

  const [filter, setFilter] = useState([deliveredfilter || ""])

  function filterByForschungsfeld(data, filterterm) {
    return data.filter((obj) => {
        return obj.forschungsfeld.some((feld)=> {
          return feld.id.includes(filterterm);
        })
    })
  }

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
      setFilterdList (filterBy(allEditorials, filter) )
      console.log("filter", filter)
    },[filter])

    let FilterElement;
    if(filter) {
      FilterElement =  <div className={styles.filterfeldwrapper} >
                        <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > {t("Deaktivieren")}</a> </div>
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

  // Lupenfilter muss ins Textfeld, Forschungsfeld, Titel
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
    setFilterdList(searchInput(allEditorials,search));
    },[search])
    const [open,setSearchbarOpen] = useState(false)
    const handleOnClick=(open)=>{
        setSearchbarOpen(open => !open)
    }


    return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
        <div className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')}>
            <input 
              className={styles.inputfeld}
              type="text" 
              placeholder="Suche" 
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className={styles.suchemoji} onClick={handleOnClick}> 
              <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em"  viewBox="0 0 87.9 86">
                <g>
                  <circle cx="31.7" cy="31.7" r="27.9"/>
                  <line x1="52.3" y1="50.4" x2="85.3" y2="83.3"/>
                </g>
              </svg>
            </span>
        </div>

        {FilterElement}

        {filterdList.map((editorial) => {

          const filterdProjectlist = filterByForschungsfeld(allProjekts, editorial.forschungsfeld[0].id)

          let background_style;
          let background_style_small;
          let colors=[];
          editorial.forschungsfeld.map((forschungsfeld) => {
            colors.push(forschungsfeld.colour.hex)
          })
          background_style={
            background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
          }
          background_style_small={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`
          }

          return(
                <div className={styles.editorialwrapper} key={editorial.id} style={background_style}>
                  <Container>
                        {editorial.forschungsfeld.map((forschungsfeld) => {
                            return (
                                <div className={styles.titel} key={forschungsfeld.id} id={forschungsfeld.slug}>{forschungsfeld.titel} </div>
                            )
                        })}
                    <div className={styles.text}>
                        {editorial.beitraege.map((beitrag) => {
                            return (
                              <TextElement key={beitrag.id} {...beitrag.text}></TextElement>
                            )
                        })}
                    </div>

                    <div className={styles.listenwrapper}> 
                        <div>{t("Koord")}</div>
                            {editorial.menschen.map((koordinatorin) => {
                                let href=`/team`
                                if(koordinatorin.slug!=""){
                                    href+=`/${koordinatorin.slug}`
                                }
                                return (
                                <ButtonLink {...koordinatorin} href={href}/>
                                )
                                })}
                    
                        <div>{t("Projekte")}</div>
                        {filterdProjectlist.map((projekt) => {
                          // console.log("projekt slug?", projekt)
                          let href=`/projekte`
                          if(projekt.slug!=""){
                              href+=`/${projekt.slug}`
                          }
                          return (
                              <ButtonLink {...projekt} href={href}/>
                          )
                        })}
                    </div>
                    
                    </Container>
                </div>
              )
            })}
      </Layout>
    )
}

 export default Editorial;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
    const editorialtexte = await request({
        query: EDITORIALTEXTE,  variables: {locale:locale},
      });

    return {
      props: {
        editorialtexte,   
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }