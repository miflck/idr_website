import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../components/Layout/layout'
import ListItemProjekt from '../../components/List/listItemProjekt'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from './projekte.module.scss'
import FilterElement from '../../components/FilterElement/filterElement'
import React, { useState, useEffect,useContext } from 'react'
import { AppContext,ACTIONS } from '../../context/state';


export default function Projekte(props) {
  // console.log("Props from Projekte",props)
  const {projekte:{allProjekts}}=props;
  const {projekte:{allForschungsfelders}}=props;
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
setFilterdList (filterBy(allProjekts, filter) )
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


  return (
      <Layout setMainColor={props.setMainColor} 
              setSecondColor={props.setSecondColor}  
              colorHexCode={props.colorHexCode} 
              colorHexCodeSecond={props.colorHexCodeSecond}
      >
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

       <FilterElement props={allForschungsfelders} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter}/>

       <div className={styles.listwrapper}>
          {filterdList.map((projekt) => {
            return(
              <ListItemProjekt {...projekt} setFilter={setFilter} filter={filter} addMoreItem={addMoreItem} 
              handleShowGradient={handleShowGradient} key={projekt.id}/>
            )
          })}
        </div>
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