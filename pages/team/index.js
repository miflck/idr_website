import { request,MENSCHEN } from "../../lib/datocms";
import styles from './team.module.scss'
import Layout from '../../components/Layout/layout'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect } from 'react'
import FilterElement from "../../components/Filter/FilterElement";


const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
  const {menschen:{allForschungsfelders}}=props;
  const {menschen:{allFunktions}}=props;
    const { t } = useTranslation('common')

    // console.log("forschungfeld in team", props);

    //GROUP BY FUNKTION DURCH FILTER FUNKTION + FORSCHUNGSFELDER ERSETZT
// function groupBy(objectArray, property, key) {
//   return objectArray.reduce(function (acc, obj) {
//     var innerObject = obj[property];
//     if(!acc[innerObject[key]]) {
//       acc[innerObject[key]] = [];
//     }
//     acc[innerObject[key]].push(obj);
//     return acc;
//   }, {});
// }
// var groupedPeople = groupBy(allMenschens, 'funktion','titel');
// for (const [key, value] of Object.entries(groupedPeople)) {
//   value.map((mensch)=>{
//   })}


 
// VON HIER BIS -------------------------------------------------------




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
    setFilterdList (filterBy(allMenschens, filter) )
    },[filter])


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
      setFilterdList(searchInput(allMenschens,search));
      },[search])
      const [open,setSearchbarOpen] = useState(false)
      const handleOnClick=(open)=>{
          setSearchbarOpen(open => !open)
      }

    let FilterElement;
    if(filter) {
      FilterElement =  <div className={styles.filterfeldwrapper} >
                        <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > {t("Deaktivieren")} </a> </div>
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
                            {allFunktions.map((funktion) =>{
                                let btn_class;
                                if(filter.includes(funktion.titel)) {
                                  btn_class = styles.forschungsfeldaktiv
                                }
                                else {
                                  btn_class = styles.forschungsfeld
                                }
                                return(
                                  <span className={btn_class}>
                                    <a 
                                    onClick={() => addMoreItem(funktion.titel)}
                                    key={funktion.titel}
                                    > 
                                      {funktion.titel} 
                                  </a>
                                  </span>
                            )})}
                        </div>
                        </div>
    }

// BIS HIER DRUCH FILTERELEMENT.JS ERSETZEN?-------------------------------------------------------

      return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
        {/* auch als component mit weitergeben der props, gleiches problem wie beim filter? */}
        
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

           <div className={styles.teamcontainer}>
           {/* <div className={styles.funktionstitle}>Leitung und Büro</div> */}
            {/*  <div className={styles.teamkachelwrapper}> */}
                {filterdList.map((mensch) => {
                    let href=`/team`
                    if(mensch.slug!=""){
                        href+=`/${mensch.slug}`
                    }
                    let ForschungsfeldElement;
                  if(filter) {
                      ForschungsfeldElement = <div className={styles.forschungsfeldwrapper}>
                          {mensch.forschungsfeld.map((forschungsfeld) => {
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
                                      </a><br></br>
                                  </span>
                              )
                          })}
                      </div>
                  }

                    return(
                      <div key={mensch.id} className={styles.menschwrapper}>
                        <Link href={href}>
                          <span>
                            <img 
                              className={styles.portrait}
                              src={mensch.portrait.url} 
                              alt={mensch.portrait.alt} 
                            />
                            <div className={styles.name}>
                                {mensch.name}
                            </div>
                          </span>
                          </Link>
                          {ForschungsfeldElement}
                      </div>
                
                    )})}
            {/* </div> */}

            {/* <div className={styles.funktionstitle}>Forscher*innen</div> */}
           {/*  <div className={styles.teamkachelwrapper}> */}
                {/* {groupedPeople.ForscherInnen.map((mensch) => {
                  let href=`/team`
                  if(mensch.slug!=""){
                  href+=`/${mensch.slug}`
                  }
                return(
                  <Link href={href}>
                  <div key={mensch.id} className={styles.menschwrapper}>
                    <img 
                    className={styles.portrait}
                    src={mensch.portrait.url} 
                    alt={mensch.portrait.alt} 
                    />
                    <div className={styles.name}>
                        <a>{mensch.name}</a>
                    </div>
                  </div>
                  </Link>
                )
                })} */}
            {/* </div> */}


          </div>
      </Layout>
    )
}

 export default Team;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
    const menschen = await request({
        query: MENSCHEN,  variables: {locale:locale},
      });

    return {
      props: {
        menschen,   
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }