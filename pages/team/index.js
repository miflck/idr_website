import { request,MENSCHEN } from "../../lib/datocms";
import styles from './team.module.scss'
import Layout from '../../Components/Layout/layout'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect, useContext } from 'react'
import FilterElement from "../../Components/FilterElement/filterElement";
// import ForschungsfeldElement from "../../Components/ForschungsfeldElement/forschungsfeldElement";
import ListItemTeam from "../../Components/List/listItemTeam"
import { AppContext,ACTIONS } from '../../context/state';
import SuchFeldElement from "../../Components/SuchFeldElement/SuchFeldElement";
import Container from "../../Components/Container/container";
import { ElementTitle } from "../../Components/Composition";

import { SpacedWrapper } from "../../Components/Composition";
import { ModularContentWrapper } from "../../Components/Composition";

const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
  const {menschen:{allForschungsfelders}}=props;
  console.log("allForschungsfelders",allForschungsfelders)
  const {menschen:{allFunktions}}=props;
    const { t } = useTranslation('common')

    // context
    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState
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

   /* const [filterdList, setFilterdList] = useState([])

    useEffect(() => {
      setFilterdList (filterBy(allMenschens, filter) )
    },[filter])

*/
  const [filterdList, setFilterdList] = useState([])
// on change active filters
useEffect(() => {
  //console.log("FILTER FROM CONTEXT  ",state.activeFilters)
  setFilterdList (filterBy(allMenschens, state.activeFilters) )
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
      setFilterdList(searchInput(allMenschens,search));
      },[search])
      
/*
      let neueListe=[];
      allForschungsfelders.map((forschungsfeld) => {
        neueListe.push(forschungsfeld)
      })
      allFunktions.map((forschungsfeld) => {
        neueListe.push(forschungsfeld)
      })
  */
      return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
          <SuchFeldElement setSearch={setSearch}/>

          {/* <FilterElement filterarray={neueListe} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter}/>*/}
           <FilterElement filterarray={allForschungsfelders} />


       
           <div className={styles.teamcontainer}>
                {filterdList.map((mensch) => {
                    if(mensch.aktiv &&! mensch.extern){
                      return(
                    
                        <ListItemTeam {...mensch}               
                        showGradient={showGradient}
                        //setFilter={setFilter} 
                        //filter={filter} 
                        //addMoreItem={addMoreItem} 
                        //handleShowGradient={handleShowGradient} 
                        key={mensch.name}/>
                      )
                    }
             
                })}
          </div>

            <Container>
              <SpacedWrapper>
                <ModularContentWrapper>
                <h2>Ehemalige:</h2>
                {filterdList.map((mensch) => {
                    if(!mensch.aktiv){
                      return(
                        <div>
                          {mensch.name}
                        </div>
                      )
                    }
                })}
                </ModularContentWrapper>            
              </SpacedWrapper>
            </Container>
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