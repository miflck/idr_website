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
  const {state}=globalState
  const { dispatch } = globalState;


  const [showGradient,setShowGradient]=useState(false);


	const handleShowGradient = (val) => {
    dispatch({ type: ACTIONS.SHOW_GRADIENT, payload:{showGradient:val} }) 
	};

//nach Forschungsfelder filtern
function filterBy(data, filterterms) {
  return data.filter((obj) => {
    //kann sein: every für && und some für || ? 
    return filterterms.every((term)=>{
      return obj.forschungsfeld.some((feld)=>{
        return feld.id.toString().includes(term);
      })
    })   
  })
}


const [filterdList, setFilterdList] = useState([])
// on change active filters
useEffect(() => {
  //console.log("FILTER FROM CONTEXT  ",state.activeFilters)
  setFilterdList (filterBy(allProjekts, state.activeFilters) )
  if(state.activeFilters.length>0){
    setShowGradient(true)
  }else{
    setShowGradient(false)
  }
},[state.activeFilters])



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




  return (
      <Layout setMainColor={props.setMainColor} 
              setSecondColor={props.setSecondColor}  
              colorHexCode={props.colorHexCode} 
              colorHexCodeSecond={props.colorHexCodeSecond}
      >
       
      <SuchFeldElement setSearch={setSearch}/>
      <FilterElement filterarray={allForschungsfelders} />

       <div className={styles.listwrapper}>
          {filterdList.map((projekt) => {
            return(
              <ListItemProjekt {...projekt}
              key={projekt.id}
              showGradient={showGradient}
              />
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