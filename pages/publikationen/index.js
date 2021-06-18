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
  // console.log("publicationdata",publicationdata);
  const { t } = useTranslation('common')

  console.log("hier vergleichen", publicationdata)
 
//nach Publikationstypen filtern
function filterBy(data, filterterms) {
  return data.filter((obj) => {
    //kann sein: every für && und some für || ? 
    return filterterms.every((term)=>{
      return obj.type.toString().includes(term);
      // return obj.type.toString().equals(type, term);
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
  setFilterdList (filterBy(publicationdata, filter) )
  console.log("filter", filter)
  console.log("filterdList", filterdList)
  },[filter])


  function groupByFlat(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      if(!acc[obj[property]]) {
        acc[obj[property]] = [];
      }
      acc[obj[property]].push(obj);
      return acc;
    }, {});
  }
  let typeList=groupByFlat(publicationdata,'type')
  // console.log("Type List ",typeList)
  const publicationTypes = Object.keys(typeList);

  let FilterElement;
  if(filter) {
    FilterElement =  <div className={styles.filterfeldwrapper} >
                      <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > alle Filter deaktivieren </a> </div>
                      <div className={styles.filterauflistung}>
                        {publicationTypes.map((publicationtype) =>{
                          // console.log("forschungsfeldeblabla", publicationtype.type)
                          let btn_class;
                          var typewithoutunderline = publicationtype.split('_').join(' ');
                          if(filter.includes(publicationtype)) {
                            btn_class = styles.forschungsfeldaktiv
                          }
                          else {
                            btn_class = styles.forschungsfeld
                          }
                          return(
                            <span className={btn_class}>
                              <a 
                              onClick={() => addMoreItem(publicationtype)}
                              key={publicationtype.type}
                              >
                                {typewithoutunderline} 
                            </a>
                            </span>
                          )})
                          }
                      </div>
                      </div>
  }


  return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
         {FilterElement}

          <ListWrapper>
                  {filterdList.map((publikation) => {
                    // console.log("props publikation weitergeben von index", publikation)
                    return (
                      <ListItemPublikation {...publikation} setFilter={setFilter} filter={filter} addMoreItem={addMoreItem} key={publikation.id}/>
                    )})
                        }
          </ListWrapper>
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