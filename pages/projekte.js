// projektliste als übersicht
// dann single view von den projekten, unterseiten als [] setzen
import Head from 'next/head'
import { request,PROJEKTE } from "../lib/datocms";

// import styles from '../styles/Home.module.scss'
import styles from './projekte.module.scss'
// import ListItem from "../../../components/List/listItem"



export default function Projekte(props) {
  // console.log("projektprops", props)
  const {projekte:{allProjekts}}=props;

  return (
   <div className={styles.projektlistwrapper}>
          {allProjekts.map((projekt, index) => {
                 const enddatum = new Date(projekt.enddatum).toLocaleString([], {
                  month: 'long', 
                  year: 'numeric'
                });
              
                   return(
                       <div className={styles.projektwrapper} key={index}>
                          <div className={styles.projektcontent}>
                            {/* Projekt Enddatum */}
                            <div className={styles.datum}>{enddatum}</div>
                            
                            {/* Projekttitel */}
                            <a href={projekt.slug}>
                                <div className={styles.titel} >
                                  {projekt.titel}
                                </div>
                            </a>
                            {/* Porjekt Forschungsfelder tags */}
                            <div className={styles.forschungsfeldwrapper}>
                                {projekt.forschungsfeld.map((forschungsfeld, index) => {
                                  return (
                                    <span className={styles.forschungsfeld} key={index}> {forschungsfeld.titel} </span>
                                  )
                                })}
                            </div>
                        </div>
                       </div>
                   )
               })}


   </div>
  )
}



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
  const projekte = await request({
      query: PROJEKTE,
    });

  return {
    props: {
      projekte,   
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths() {
// }
