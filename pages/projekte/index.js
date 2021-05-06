import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../components/Layout/layout'
import ListWrapper from '../../components/List/listWrapper'
import ListItemProjekt from '../../components/List/listItemProjekt'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState, useEffect } from 'react'
import styles from '../../components/List/list.module.scss'

export default function Projekte(props) {
  const {projekte:{allProjekts}}=props;
  const { t } = useTranslation('common')



function filterBy(data, filterterm) {
  return data.filter((obj) => {
    return obj.forschungsfeld.some((feld)=>{
      return feld.titel.toString().includes(filterterm);
      })
    }
  )
}
  
 var filterd = filterBy(allProjekts, "Social Communication");
 console.log("filtered",filterd)


    const [search, setSearch] = useState('')
    //contacts in projektnamen etc umwandeln?
    // const [contacts, setContacts] = useState([])


    const [open,setSearchbarOpen] = useState(false)
  const handleOnClick=(open)=>{
    setSearchbarOpen(open => !open)
  }

  return (
      <Layout>

        {/* Suchfeld */}
        <div className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')} 
          >
           <input 
              className={styles.inputfeld}
              type="text" 
              placeholder="Suche" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span 
              className={styles.suchemoji} 
              onClick={handleOnClick}
              >
              {/* &#9786;  */}
              &#128269;
            </span>
            
        </div>

          <ListWrapper>
                {allProjekts.map((projekt) => {
                  return(
                    <ListItemProjekt {...projekt} key={projekt.id}/>
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