// import { request, PUBLIKATIONEN } from "../../lib/datocms";
import Layout from "../../components/Layout/layout"
import ListWrapper from '../../components/List/listWrapper'
import ListItemPublikation from "../../components/List/listItemPublikation";
import styles from './publikationen.module.scss'
import Container from "../../components/Container/container";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect } from 'react'
import arborAPI from "../../lib/export_arbor_JSON"

export default function Publikationen(props) {
  let {publicationdata}=props || ""
  publicationdata = arborAPI;

  if(props) {
  // const {publikationen:{allPublikationens},publicationdata}=props;

  // console.log("allempublikationens",props);
  console.log("publicationdata",publicationdata);
  const { t } = useTranslation('common')

  

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
  // var groupedPublications = groupBy(allPublikationens, 'publikationsart','titel');
  // for (const [key, value] of Object.entries(groupedPublications)) {
  //   value.map((publikation)=>{
  //   })}


  function groupByFlat(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var innerObject = obj[property];
      if(!acc[obj[property]]) {
        acc[obj[property]] = [];
      }
      acc[obj[property]].push(obj);
      return acc;
    }, {});
  }
  
  // var groupedPublications = groupByFlat(publicationdata, 'type');
  //   for (const [key, value] of Object.entries(groupedPublications)) {
  //     value.map((publikation)=>{
  //     })}
  // console.log("grouped publication: ",groupedPublications)



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
  setFilterdList (groupByFlat(publicationdata, filter) )
  console.log("filter", filter)
  console.log("filterdList", filterdList)
  },[filter])

  var groupedPublications = groupByFlat(publicationdata, filter);
    for (const [key, value] of Object.entries(groupedPublications)) {
      value.map((publikation)=>{
      })}
  console.log("grouped publication: ",groupedPublications)
  // useEffect(() => {
  // setFilterdList (filterBy(allProjekts, filter) )
  // },[filter])



  let FilterElement;
  if(filter) {
    FilterElement =  <div className={styles.filterfeldwrapper} >
                      <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > alle Filter deaktivieren </a> </div>
                      <div className={styles.filterauflistung}>
                        {publicationdata.map((publicationtype) =>{
                          // console.log("forschungsfeldeblabla", publicationtype.type)
                          let btn_class;
                          if(filter.includes(publicationtype.type)) {
                            btn_class = styles.forschungsfeldaktiv
                          }
                          else {
                            btn_class = styles.forschungsfeld
                          }
                          return(
                            <span className={btn_class}>
                              <a 
                              onClick={() => addMoreItem(publicationtype.type)}
                              key={publicationtype.type}
                              >
                                {publicationtype.type} 
                            </a>
                            </span>
                          )})}
                      </div>
                      </div>
  }


  return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
         {FilterElement}

          <ListWrapper>
                  {publicationdata.map((publikation) => {
                    console.log("props publikation weitergeben von index", publikation)
                    return(
                      <ListItemPublikation {...publikation} setFilter={setFilter} filter={filter} addMoreItem={addMoreItem} key={publikation.id}/>
                    )})
                        }
          </ListWrapper>

          {/* groupedPublicationsTest.book.map */}
          {/*  
          <div className={styles.funktionstitle}><Container>Buch</Container></div>
          <ListWrapper>
                  {groupedPublications.Buch.map((publikation) => {
                    return(
                      <ListItemPublikation {...publikation} key={publikation.id}/>
                    )})
                        }
          </ListWrapper>

          <div className={styles.funktionstitle}><Container>Forschungsbericht</Container></div>
          <ListWrapper>
                {groupedPublications.Forschungsbericht.map((publikation) => {
                  return(
                    <ListItemPublikation {...publikation} key={publikation.id}/>
                  )})
                      }
          </ListWrapper>

          <div className={styles.funktionstitle}><Container>Sonstige</Container></div>
          <ListWrapper>
                {groupedPublications.Sonstige.map((publikation) => {
                  return(
                    <ListItemPublikation {...publikation} key={publikation.id}/>
                  )})
                      }
          </ListWrapper> */}


      </Layout>
  )
}

else{
  return (
    <>
    </>
  )
}
}


export async function getStaticProps({locale}) {
    // const publikationen = await request({
    //     query: PUBLIKATIONEN, variables: {locale:locale},
    //   });

      const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
      const publicationdata = await res.json()


  return {
    props: {
      // publikationen, 
      publicationdata,  
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths() {
// }