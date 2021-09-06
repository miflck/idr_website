import { request,VERANSTALTUNGEN } from "../../lib/datocms"
import React, { useState, useEffect, useContext } from 'react'
import styles from './veranstaltungen.module.scss'
import Layout from '../../Components/Layout/layout'
// import Link from 'next/link'
// import Container from '../../Components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import ForschungsfeldElement from '../../Components/ForschungsfeldElement/forschungsfeldElement'
import { AppContext,ACTIONS } from '../../context/state';
import FilterElement from "../../Components/FilterElement/filterElement"
import ListItemVeranstaltung from "../../Components/List/listItemVeranstaltung"
import SuchFeldElement from "../../Components/SuchFeldElement/SuchFeldElement"

const Veranstaltungen =(props)=>{
  const {veranstaltungen:{allVeranstaltungs}}=props;
  const {veranstaltungen:{allForschungsfelders}}=props;
    // console.log("props",props);
    const { t } = useTranslation('common')

    // context
  const globalState = useContext(AppContext);
  const { dispatch } = globalState;
  const {state}=globalState

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
      else {
        setFilter([...filter, item])
      }
    }

    const [filterdList, setFilterdList] = useState([])

    useEffect(() => {
      setFilterdList (filterBy(allVeranstaltungs, filter) )
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
      setFilterdList(searchInput(allVeranstaltungs,search));
      },[search])
      

    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
        <SuchFeldElement setSearch={setSearch}/>

        <FilterElement filterarray={allForschungsfelders} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter}/>
        
        <div className={styles.veranstaltungswrapper} >
            {filterdList.map((veranstaltung) => {
              
                    return(
                      <ListItemVeranstaltung {...veranstaltung} setFilter={setFilter} filter={filter} addMoreItem={addMoreItem} 
                      handleShowGradient={handleShowGradient} key={veranstaltung.id}/>
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

 

