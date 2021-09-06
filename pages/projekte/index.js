import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../Components/Layout/layout'
import ListItemProjekt from '../../Components/List/listItemProjekt'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from './projekte.module.scss'
import FilterElement from '../../Components/FilterElement/filterElement'
import React, { useState, useEffect,useContext } from 'react'
import { AppContext,ACTIONS } from '../../context/state';
import SuchFeldElement from "../../Components/SuchFeldElement/SuchFeldElement";


export default function Projekte(props) {
   console.log("Props from Projekte",props)
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
       
        <SuchFeldElement setSearch={setSearch}/>

       <FilterElement filterarray={allForschungsfelders} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter} />

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