import { request,VERANSTALTUNGEN } from "../../lib/datocms"
import React, { useState, useEffect, useContext } from 'react'
import styles from './veranstaltungen.module.scss'
import Layout from '../../components/Layout/layout'
import Link from 'next/link'
import FilterLink from '../../components/FilterLink/FilterLink'
import Container from '../../components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ForschungsfeldElement from '../../components/ForschungsfeldElement/ForschungsfeldElement'


import { AppContext,ACTIONS } from '../../context/state';
import FilterElement from "../../components/FilterElement/FilterElement"

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
      const [open,setSearchbarOpen] = useState(false)
      const handleOnClick=(open)=>{
          setSearchbarOpen(open => !open)
      }

    return(
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

        
        <FilterElement props={allForschungsfelders} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter}/>
        
        <div className={styles.veranstaltungswrapper} >
            {filterdList.map((veranstaltung) => {
              let href=`/veranstaltungen`
              if(veranstaltung.slug!=""){
                  href+=`/${veranstaltung.slug}`
              }
              
                const date = new Date(veranstaltung.datum).toLocaleString([], {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit'});

                let background_style={};
                let background_style_small={}; 

                let colors=[];
                veranstaltung.forschungsfeld.map((forschungsfeld) => {
                  colors.push(forschungsfeld.colour.hex)
                })
                    
                if(state.showGradient){
                    background_style={
                    background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
                    }
                    background_style_small={
                    background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`
                    }
                }
                
                    return(
                      <div className={styles.veranstaltungscontent} key={veranstaltung.id} style={background_style_small}>
                          <Container>
                              <div className={styles.datum}>{date} {t("Uhr")}</div>
                              <Link href={href}>
                                <div className={styles.title}>{veranstaltung.titel}</div>
                              </Link>
                              <div className={styles.title}>{veranstaltung.untertitel}</div>

                              <ForschungsfeldElement {...veranstaltung} filter={filter} addMoreItem={addMoreItem} />
                          
                          </Container>
                        </div>
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

 

