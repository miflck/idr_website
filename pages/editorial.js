import { request,EDITORIALTEXTE, EDITORIALINTRO } from "../lib/datocms";
import styles from './editorial.module.scss'
import Layout from '../Components/Layout/layout'
import Container from '../Components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextElement from "../Components/Composition/TextElement";
import FilterElement from '../Components/FilterElement/filterElement'
import ButtonLink from '../Components/ButtonLink/buttonLink'
import React, { useState, useEffect } from 'react'
import SuchFeldElement from "../Components/SuchFeldElement/SuchFeldElement";

import { useRouter } from 'next/router'

const Editorial =(props)=>{
  const {editorialtexte:{allEditorials}}=props;
  const {editorialtexte:{allProjekts}}=props;
  const {editorialtexte:{allForschungsfelders}}=props;
  const {editorialintro}=props;

  const { t } = useTranslation('common')

 
  const router = useRouter()
  let deliveredkeyword;
  let deliveredfilter;
  if(router.query.keyword){
    // console.log("keyword", router.query.keyword)
    deliveredkeyword = router.query.keyword;
    // router.asPath.split(/=/)[1]
    deliveredfilter = deliveredkeyword.split("-").join(" ");
    // console.log("delivered filter", deliveredfilter)
    // console.log("keyword als filterinput", deliveredkeyword.split("-").join(" "))
  }

  // const [filter, setFilter] = useState([deliveredfilter || ""])
  // console.log("filter am anfang mit keyword als input", filter)

    // ternary expression = if else shorthand
  let initState = typeof deliveredfilter === "undefined" || !deliveredfilter ? [] : new Array(deliveredfilter);
  const [filter, setFilter] = useState(initState)
  const [filterdList, setFilterdList] = useState(allEditorials)
  const [search, setSearch] = useState('')


  //setFilterdList (filter.length>0?filterBy(allEditorials, filter):allEditorials ) // filter if any filter is set, else show all 

  
  //ohne – sondern mit Leerschlag wählt es den Filter in der Auswahl an, aber funktionert nicht in der filterd List
  // const [filter, setFilter] = useState(["Knowledge Visualization"])
  //mit - wählts oben bei der auswahl nichts an
  // const [filter, setFilter] = useState(["Knowledge-Visualization"])

    //Projekte zu Forschungsfeld dazufiltern
  function filterByForschungsfeld(data, filterterm) {
    return data.filter((obj) => {
        return obj.forschungsfeld.some((feld)=> {
          return feld.id.includes(filterterm);
        })
    })
  }

    //nach Forschungsfelder filtern
    function filterBy(data, filterterms) {
      // console.log("--- filter by", data,filterterms)
      return data.filter((obj) => {
        //kann sein: every für && und some für || ? 
        return filterterms.every((term)=>{
          return obj.forschungsfeld.some((feld)=>{
            // console.log(term)
            return feld.titel.toString().includes(term);
          })
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
      else {
        setFilter([...filter, item])
      }
    }


    useEffect(() => {
      // console.log("**** useEffect filter",filter,filter.length, filterdList)
     // setFilterdList (filter.length>0?filterBy(allEditorials, filter):allEditorials ) // filter if any filter is set, else show all 
      setFilterdList (filterBy(allEditorials, filter) ) // filter if any filter is set, else show all 
      // console.log("## result",filterBy(allEditorials, filter))
    },[filter])

    /*
    This was for debuggin
    useEffect(() => {
      console.log("++++++++ useEffect filterdList",filter, filterdList)
    },[filterdList])
    */

    // This got called on init -> overwrote filter
    useEffect(() => {
      if(search){
        // skip initial render as then it deletes filtered list from deliverd filter
        setFilterdList(searchInput(allEditorials,search));
      }
    },[search])


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



    return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
        <SuchFeldElement setSearch={setSearch}/>

        <FilterElement filterarray={allForschungsfelders} filter={filter} setFilter={setFilter} addMoreItem={addMoreItem}/>
        
        
        <div className={styles.editorialintro}>
          <Container>
            <div className={styles.titel}> 
              {editorialintro.editorialeinfHrungstext.titel} 
            </div>
            <div className={styles.text}> 
              <TextElement {...editorialintro.editorialeinfHrungstext.text}/>
            </div>
          </Container>
        </div>
       
        

        {filterdList.map((editorial) => {
           
          const filterdProjectlist = filterByForschungsfeld(allProjekts, editorial.forschungsfeld[0].id)

          let background_style;
          let background_style_small;
          let colors=[];
          editorial.forschungsfeld.map((forschungsfeld) => {
            colors.push(forschungsfeld.colour.hex)
          })
          background_style={
            background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
          }
          background_style_small={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`
          }

          return(
                <div className={styles.editorialwrapper} key={editorial.id} style={background_style}>
                  <Container>

                        {editorial.forschungsfeld.map((forschungsfeld) => {
                            return (
                                <div className={styles.titel} key={forschungsfeld.id} id={forschungsfeld.slug}>{forschungsfeld.titel} </div>
                            )
                        })}
                    <div className={styles.text}>
                        {editorial.beitraege.map((beitrag) => {
                            return (
                              <TextElement key={beitrag.id} {...beitrag.text}></TextElement>
                            )
                        })}
                    </div>

                    <div className={styles.listenwrapper}> 
                        <div>{t("Koord")}</div>
                            {editorial.menschen.map((koordinatorin) => {
                                let href=`/team`
                                if(koordinatorin.slug!=""){
                                    href+=`/${koordinatorin.slug}`
                                }
                                return (
                                <ButtonLink {...koordinatorin} href={href}/>
                                )
                                })}
                    
                        <div>{t("Projekte")}</div>
                        {filterdProjectlist.map((projekt) => {
                          // console.log("projekt slug?", projekt)
                          let href=`/projekte`
                          if(projekt.slug!=""){
                              href+=`/${projekt.slug}`
                          }
                          return (
                              <ButtonLink {...projekt} href={href}/>
                          )
                        })}
                    </div>
                    
                    </Container>
                </div>
              )
            })}
      </Layout>
    )
}

 export default Editorial;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
    const editorialtexte = await request({
      query: EDITORIALTEXTE,  variables: {locale:locale},
    });
    const editorialintro = await request({
      query: EDITORIALINTRO,  variables: {locale:locale},
    });

    return {
      props: {
        editorialtexte,   
        editorialintro,
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }