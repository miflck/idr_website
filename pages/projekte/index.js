import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../components/Layout/layout'
import ListWrapper from '../../components/List/listWrapper'
import ListItemProjekt from '../../components/List/listItemProjekt'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect } from 'react'
import styles from '../../components/List/list.module.scss'

export default function Projekte(props) {
  console.log("Props from Projekte",props)
  const {projekte:{allProjekts}}=props;
  const {projekte:{allForschungsfelders}}=props;
  const { t } = useTranslation('common')

//nach Forschungsfelder filtern
  function filterBy(data, filterterm) {
    return data.filter((obj) => {
      return obj.forschungsfeld.some((feld)=>{
          return feld.titel.toString().includes(filterterm);
        })
      }
    )
  }
const [filter, setFilter] = useState('')
const [filterdList, setFilterdList] = useState([])

useEffect(() => {
  setFilterdList (filterBy(allProjekts, filter) )
  // console.log("USe Effect in App",filter, filterdList)
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



  // contacts in projektnamen, forschungsfeld etc umwandeln?
  // const [text, setText] = useState([])
  // useEffect(() => {
  // const API_URL = {props}
  // .get(API_URL).then(res => {
  //   const text = res.data
  //   setText(text)
  //   })
  // }, [])
  // const filteredText = search.length === 0 ? text : 
  // text.filter(text => text.IRGENDEINEVARIABEL.toLowerCase().includes(search.toLowerCase()))

const [open,setSearchbarOpen] = useState(false)
const handleOnClick=(open)=>{
      setSearchbarOpen(open => !open)
}

let FilterElement;
if(filter) {
  FilterElement =  <div className={styles.aktivfilter} >
                    <a onClick={() => setFilter("")} className={styles.deaktivieren}> Filter deaktivieren </a>
                      {allForschungsfelders.map((forschungsfeld) =>{
                        return(
                          <a onClick={() => setFilter(forschungsfeld.titel)} className={styles.forschungsfeld} > {forschungsfeld.titel} </a>
                        )})}
                    </div>
}

  return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor}  colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond} >
        {/* Suchfeld */}
        <div className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')} 
          >
           <input 
              className={styles.inputfeld}
              type="text" 
              placeholder="Suche" 
             // value={search}
             onChange={(e) => setSearch(e.target.value)}
              //onChange={(e) => console.log(e.target.value)}

              //onClick={() => setText(search)}
            />
            <span 
              className={styles.suchemoji} 
              onClick={handleOnClick}
              >
              {/* &#9786;*/}
              &#128269;
            </span>
            {/* <div>  
              <ul>
              {contacts.map(contact => (
                  <li key={contact.id}>
                      Name:
                        <span>{contact.full_name}</span>
                      Phone: 
                        <span>{contact.tel}</span>
                  </li>   
              ))}
              </ul>
          </div> */}
        </div>


       {FilterElement}

          {/* <ListWrapper>
                {allProjekts.map((projekt) => {
                  return(
                    <ListItemProjekt {...projekt} setFilter={setFilter} key={projekt.id}/>
                  )})
                      }
            </ListWrapper>

< br /> */}

{/* <h2>filtered result:</h2> */}
            <ListWrapper>
                {filterdList.map((projekt) => {
                  return(
                    <ListItemProjekt {...projekt} setFilter={setFilter} key={projekt.id}/>
                  )})
                      }
            </ListWrapper>

      </Layout>
  )
}

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
  const projekte = await request({
      query: PROJEKTE, variables: {locale:locale},
    });

  return {
    props: {
      projekte,   
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}


// export async function getStaticPaths() {
// }