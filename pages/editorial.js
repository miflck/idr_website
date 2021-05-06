import { request,EDITORIALTEXTE } from "../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from './editorial.module.scss'
import Layout from '../components/Layout/layout'
import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const Editorial =(props)=>{
  const {editorialtexte:{allEditorials}}=props;
  const { t } = useTranslation('common')
    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
            {allEditorials.map((editorial) => {
              return(
                <div className={styles.editorialwrapper} key={editorial.id}>
                    {/* Forschungsfeld */} 
                        {editorial.forschungsfeld.map((forschungsfeld, index) => {
                            return (
                                <div className={styles.titel} key={forschungsfeld.id}>{forschungsfeld.titel} </div>
                            )
                        })}
                 
                    {/* Beitrag Text */}
                    <div>
                        {editorial.beitraege.map((beitrag) => {
                            return (
                                <StructuredText data={beitrag.text.value} key={beitrag.id}/>
                            )
                        })}
                    </div>

                    <div className={styles.listenwrapper}> 
                        {/* Leitung  */}
                        <div>Koordinator*in</div>
                            {editorial.menschen.map((koordinatorin) => {
                                let href=`/team`
                                if(koordinatorin.slug!=""){
                                    href+=`/${koordinatorin.slug}`
                                }
                                return (
                                <Link href={href} key={koordinatorin.id}>
                                  <a>{koordinatorin.name}</a>
                                </Link>
                                )
                                })}
                    
                        {/* Projektliste */}
                        <div>Projekte</div>
                            {editorial.projekte.map((projekt, index) => {
                                let href=`/projekte`
                                if(projekt.slug!=""){
                                    href+=`/${projekt.slug}`
                                }
                                return (
                                  <Link href={href} key={projekt.id}>
                                        <a>{projekt.titel}<br></br></a>
                                  </Link>
                                )
                            })}
                        
                    </div>


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

    return {
      props: {
        editorialtexte,   
        ...await serverSideTranslations(locale, ['common']),
      }, // will be passed to the page component as props
    }
  }