import { request,MENSCHEN } from "../../lib/datocms";
import styles from './team.module.scss'
import Layout from '../../components/Layout/layout'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect, useContext } from 'react'
import FilterElement from "../../components/FilterElement/filterElement";
import ForschungsfeldElement from "../../components/ForschungsfeldElement/ForschungsfeldElement";
import { AppContext,ACTIONS } from '../../context/state';

const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
  const {menschen:{allForschungsfelders}}=props;
  const {menschen:{allFunktions}}=props;
    const { t } = useTranslation('common')

    // context
    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState
    const [showHoverGradient,setHoverGradient]=useState();
	  const handleShowGradient = (val) => { };

    // console.log("forschungfeld in team", props);

    //GROUP BY FUNKTION DURCH FILTER FUNKTION + FORSCHUNGSFELDER ERSETZT
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
// var groupedPeople = groupBy(allMenschens, 'funktion','titel');
// for (const [key, value] of Object.entries(groupedPeople)) {
//   value.map((mensch)=>{
//   })}


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
      setFilterdList (filterBy(allMenschens, filter) )
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
      setFilterdList(searchInput(allMenschens,search));
      },[search])
      const [open,setSearchbarOpen] = useState(false)
      const handleOnClick=(open)=>{
          setSearchbarOpen(open => !open)
      }

      let neueListe=[];
      allForschungsfelders.map((forschungsfeld) => {
        neueListe.push(forschungsfeld)
      })
      allFunktions.map((forschungsfeld) => {
        neueListe.push(forschungsfeld)
      })
      // console.log("liste", neueListe)
  
      

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

           <FilterElement props={neueListe} filter={filter} addMoreItem={addMoreItem} setFilter={setFilter}/>

           <div className={styles.teamcontainer}>
                {filterdList.map((mensch) => {
                    let href=`/team`
                    if(mensch.slug!=""){
                        href+=`/${mensch.slug}`
                    }

                    // let colors=[];
                    // mensch.forschungsfeld.map((forschungsfeld) => {
                    // colors.push(forschungsfeld.colour.hex)
                    // })

                    // let background_style={
                    //     background: `linear-gradient(to right,"white"})`,
                    //     animation:`${styles.fadeOut} 0.5s ease`
                    // };

                    // let background_style_small={
                    //     background: `linear-gradient(to right,"white"})`,
                    //     animation:`${styles.fadeOut} 0.5s ease`,
                    // }; 

                    // if(state.showGradient || showHoverGradient){
                    //     background_style={
                    //         background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
                    //         opacity:1,
                    //         animation:` ${styles.fadeIn} 0.5s ease`
                    //       }
              
                    // background_style_small={
                    //     background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
                    //     opacity:1,
                    //     animation:`${styles.fadeIn} 0.5s ease`
                    //   }
                    // }
                  
                    return(
                      <div key={mensch.id} className={styles.menschwrapper} 
                      // style={background_style_small}  finde es hier bitzli ugly, du so?
                      // onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}
                      >
                        <Link href={href}>
                          <span>
                            <img 
                              className={styles.portrait}
                              src={mensch.portrait.url} 
                              alt={mensch.portrait.alt} 
                            />
                            <div className={styles.name}>
                                {mensch.name}
                            </div>
                          </span>
                        </Link>
                        <ForschungsfeldElement {...mensch} filter={filter} addMoreItem={addMoreItem} showHoverGradient={showHoverGradient}/>
                      </div>
                
                    )})}
          </div>
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