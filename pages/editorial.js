import { request,EDITORIALTEXTE } from "../lib/datocms";
import styles from './editorial.module.scss'
import Layout from '../components/Layout/layout'
import Container from '../components/Container/container'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextElement from '../components/TextElement/TextElement'
import ButtonLink from '../components/ButtonLink/ButtonLink'

const Editorial =(props)=>{
  const {editorialtexte:{allEditorials}}=props;
  const { t } = useTranslation('common')
    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
            {allEditorials.map((editorial) => {
              return(
                <div className={styles.editorialwrapper} key={editorial.id}>
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
                        <div>Koordinator*in</div>
                            {editorial.menschen.map((koordinatorin) => {
                                let href=`/team`
                                if(koordinatorin.slug!=""){
                                    href+=`/${koordinatorin.slug}`
                                }
                                return (
                                <ButtonLink {...koordinatorin} href={href}/>
                                )
                                })}
                    
                        <div>Projekte</div>
                            {editorial.projekte.map((projekt, index) => {
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

    return {
      props: {
        editorialtexte,   
        ...await serverSideTranslations(locale, ['common']),
      }, // will be passed to the page component as props
    }
  }