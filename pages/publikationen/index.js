import Layout from "../../components/Layout/layout"
import ListItemPublikation from "../../components/List/listItemPublikation";
import styles from './publikationen.module.scss'
import Container from "../../components/Container/container";
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect } from 'react'
import arborAPI from "../../lib/export_arbor_JSON"
import { useRouter } from 'next/router'


export default function Publikationen(props) {
  let {publicationdata}=props || ""
  publicationdata = arborAPI;

  let filterfields=["contributors","creators"]

  if(props) {
  const { t } = useTranslation('common')


  const router = useRouter()
  // console.log("roter nach type", router.asPath.split(/=/)[1])
  //var deliveredfilter = router.asPath.split(/=/)[1]

  let deliveredfilter=router.query.keyword; 

  // ternary expression = if else shorthand
  let initState = typeof deliveredfilter === "undefined" || !deliveredfilter ? [] : new Array(deliveredfilter);
  const [filter, setFilter] = useState(initState)

//nach Publikationstypen filtern
function filterBy(data, filterterms) {
  return data.filter((obj) => {
    //kann sein: every für && und some für || ? 
    return filterterms.every((term)=>{
      return obj.type.toString()===term;
    })   
  })
}

  

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
    console.log("use effect filter",filter)
    setFilterdList(filterBy(publicationdata, filter) )
    console.log("filter publi index", filter)
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


  /*

  //geht noch nicht, andere Strukturen, mag nicht mehr
// Lupenfilter muss ins Textfeld, Forschungsfeld, Titel
  function searchInput(data, inputvalue,filterfields) {
    console.log("search", data)
    return data.filter((obj) => {
      console.log("Object.keys(obj)",Object.keys(obj))

        return Object.keys(obj).some((key)=>{

          if(filterfields.indexOf(key)>-1){
            console.log("key",key)

            }

          // objekte?
          if(typeof obj[key] !=='undefined' ){
            console.log("obj key",obj[key])

					}

        
        // array
        /*  if(Array.isArray(obj[key])){

          return obj[key].some((entry)=>{
            return Object.keys(entry).some((kkey=>{
              return entry[kkey].toString().includes(inputvalue);
            }))
          })
        }

*/
/*

        else{
          return obj[key].toString().toLowerCase().includes(inputvalue.toLowerCase());
        }
      })
      }
    )
  }
  
  const [search, setSearch] = useState('')
  useEffect(() => {
  setFilterdList(searchInput(publicationdata,search,filterfields));
  },[search])
  */
  const [open,setSearchbarOpen] = useState(false)
  const handleOnClick=(open)=>{
      setSearchbarOpen(open => !open)
  }


  let FilterElement;
  if(filter) {
    FilterElement =  <div className={styles.filterfeldwrapper} >
                      <div className={styles.deaktivieren}> <a onClick={() => setFilter([])} > {t("Deaktivieren")} </a> </div>
                      <div className={styles.filterauflistung}>
                        {publicationTypes.map((publicationtype) =>{
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
        
        {FilterElement}

          <div className={styles.listwrapper}>
                  {filterdList.map((publikation) => {
                    return (
                      <ListItemPublikation {...publikation} setFilter={setFilter} filter={filter} addMoreItem={addMoreItem} key={publikation.id}/>
                    )})
                        }
          </div>
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

      //const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
      //const publicationdata = await res.json()
      const publicationdata=""

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