import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../components/Layout/layout'
import ListWrapper from '../../components/List/listWrapper'
import ListItemProjekt from '../../components/List/listItemProjektzwei'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect } from 'react'
import styles from '../../components/List/list.module.scss'

export default function Projekte(props) {
  // console.log("Props from Projekte",props)
  const {projekte:{allProjekts}}=props;
  const {projekte:{allForschungsfelders}}=props;
  const { t } = useTranslation('common')

//nach Forschungsfelder filtern
  function filterBy(data, filterterms) {
    return data.filter((obj) => {
      //kann sein: every für && und some für || ? 
      return filterterms.every((term)=>{
        return obj.forschungsfeld.some((feld)=>{
          console.log("feld",feld.titel,term,feld.titel.toString().includes(term))
          return feld.titel.toString().includes(term);
        })
      })   
    })
  }

const [filter, setFilter] = useState([])
const addMoreItem = (item) => {
//  mit splice erneute angeklickter filter wegnehmen
// if(filter.includes(item)) {
//   setFilter([]) hier removen, wenn schon im array
// }
 setFilter([...filter, item])
//  console.log("aktiver filter", filter,item)
}

const [filterdList, setFilterdList] = useState([])

useEffect(() => {
  // console.log(" filter change", filter)

  setFilterdList (filterBy(allProjekts, filter) )
},[filter])

// mit createStore arbeiten?
// https://redux.js.org/api/createstore/
// Object.assign({}, state, newData)




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
  setFilterdList(searchInput(allProjekts,search));
},[search])

const [open,setSearchbarOpen] = useState(false)
const handleOnClick=(open)=>{
      setSearchbarOpen(open => !open)
}

// const [aktiv,setForschungsfeldaktiv] = useState(false)
// const handleAktivForschungsfeld=(aktiv)=>{
//   setForschungsfeldaktiv(aktiv => !aktiv)
// }

let FilterElement;
if(filter) {
  FilterElement =  <div className={styles.aktivfilter} >
                    <a onClick={() => setFilter([])} className={styles.deaktivieren}> Filter deaktivieren </a>
                      {allForschungsfelders.map((forschungsfeld) =>{
                        return(
                          <a 
                            onClick={() => addMoreItem(forschungsfeld.titel)}
                            className={styles.forschungsfeld}
                            > {forschungsfeld.titel} </a>
                        )})}
                    </div>
}

  return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor}  colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond} >
        {/* Suchfeld */}
        <div className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')}>
           <input 
              className={styles.inputfeld}
              type="text" 
              placeholder="Suche" 
              onChange={(e) => setSearch(e.target.value)}
            />
            <span 
              className={styles.suchemoji} 
              onClick={handleOnClick}
              >
              {/* &#9786;*/}
              &#128269;
            </span>
        </div>


       {FilterElement}

            <ListWrapper>
                {filterdList.map((projekt) => {
                  const forschungsfelderliste = [allForschungsfelders]
                  // console.log("was wird hier mitgegeben",forschungsfelderliste)
                  return(
                    <ListItemProjekt {...projekt} hidePainHarold={forschungsfelderliste} setFilter={setFilter} addMoreItem={addMoreItem} 
                    // setForschungsfeldaktiv={setForschungsfeldaktiv} 
                    key={projekt.id}/>
                  )})
                      }
            </ListWrapper>

      </Layout>
  )
}

export async function getStaticProps({locale}) {
  const projekte = await request({
      query: PROJEKTE, variables: {locale:locale},
    });

  return {
    props: {
      projekte,   
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}