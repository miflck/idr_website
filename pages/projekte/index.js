import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../components/Layout/layout'
import ListWrapper from '../../components/List/listWrapper'
import ListItemProjekt from '../../components/List/listItemProjekt'
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
  function filterBy(data, filterterm) {
    return data.filter((obj) => {
      return obj.forschungsfeld.some((feld)=>{
          return feld.titel.toString().includes(filterterm);
        })
      }
    )
  }

  // Filter dazu Test hat funktioniert bei Zeile 31 nach filter noch && "Social Communication" dazuzufügen
const [filter, setFilter] = useState('')
const [filterdList, setFilterdList] = useState([])

useEffect(() => {
  setFilterdList (filterBy(allProjekts, filter && "Social Communication") )
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

let FilterElement;
if(filter) {
  FilterElement =  <div className={styles.aktivfilter} >
                    <a onClick={() => setFilter("")} className={styles.deaktivieren}> Filter deaktivieren </a>
                      {allForschungsfelders.map((forschungsfeld) =>{
                        return(
                          <a onClick={() => setFilter(forschungsfeld.titel)} className={styles.forschungsfeld} > {forschungsfeld.titel} </a>
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
                  return(
                    <ListItemProjekt {...projekt} setFilter={setFilter} key={projekt.id}/>
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