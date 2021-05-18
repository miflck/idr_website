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
          // console.log("feld",feld.titel,term,fesld.titel.toString().includes(term))
          return feld.titel.toString().includes(term);
        })
      })   
    })
  }

const [filter, setFilter] = useState([])
const addMoreItem = (item) => {
//  mit splice erneute angeklickter filter wegnehmen
// if(filter.includes(item)) {
  //index rausfinden und dann das weg splicen an diesem index mit IndexOf
//   setFilter([]) hier removen, wenn schon im array
// }
const copyfilter = [...filter]
var index = copyfilter.indexOf(item);
if (index !== -1) {
  copyfilter.splice(index, 1);
  setFilter([...copyfilter])
}
else{
  setFilter([...filter, item])
}
//  console.log("aktiver filter", filter,item)
}

const [filterdList, setFilterdList] = useState([])

useEffect(() => {
  // console.log(" filter change", filter)
  setFilterdList (filterBy(allProjekts, filter) )
},[filter])

// if(filter.includes(`${forschungsfeld.titel}`))

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

const [black, setColor] = useState(true)
const changeColor=(black)=> {
  setColor(black => !black)
}



let FilterElement;
if(filter) {
  FilterElement =  <div className={styles.filterfeldwrapper} >
                    <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > Filter deaktivieren </a> </div>
                    <div className={styles.filterawrapper}>
                      {allForschungsfelders.map((forschungsfeld) =>{
                        let btn_class;
                        if(filter.includes(forschungsfeld.titel)) {
                          btn_class = styles.forschungsfeldaktiv
                        }
                        else {
                          btn_class = styles.forschungsfeld
                        }
                          return(
                            <div className={btn_class}>
                              <a 
                              onClick={() => addMoreItem(forschungsfeld.titel)}
                              // className={btn_class}
                              key={forschungsfeld.titel}
                              > 
                              {forschungsfeld.titel} 
                            </a>
                            </div>
                      )})}
                    </div>
                    </div>
}
const BackgroundGrid = []
 for (var i=0;i<6;i++) {
  BackgroundGrid.push(<div className={styles.backgroundGrid} key={i}></div>)
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
      <div className={styles.backgroundGridwrapper}>
        {BackgroundGrid}
      </div>

            <ListWrapper>
                {filterdList.map((projekt) => {
                  //const forschungsfelderliste = [allForschungsfelders]
                  // console.log("was wird hier mitgegeben",forschungsfelderliste)
                  return(
                    <ListItemProjekt {...projekt} 
                      allForschungsfelder={allForschungsfelders} 
                      setFilter={setFilter} 
                      addMoreItem={addMoreItem} 
                      // handleAktivForschungsfeld={handleAktivForschungsfeld}
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