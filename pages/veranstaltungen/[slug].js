import Layout from "../../components/Layout/layout"
import { request, VERANSTALTUNGEINZEL } from "../../lib/datocms";
import styles from './veranstaltungen.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Container from '../../components/Container/container'
import TextElement from "../../components/TextElement/TextElement";
import Link from 'next/link'

export default function Veranstaltungseinzelansicht (props) {
  const {data:{veranstaltung:{
    titel,
    id,
    datum,
    referentIn,
    untertitel,
    organisation,
    beschreibung,
    forschungsfeld
  }=""}=""}=props || ""
    // console.log("veranstaltungsprops",veranstaltung);
    const { t } = useTranslation('common')

    const date = new Date(datum).toLocaleString([], {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit'});
      if(props.data) {
    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        <div className={styles.veranstaltungswrapper} >
                       <div className={styles.veranstaltungscontent} key={id}>
                         <Container>
                            <div className={styles.title}>{titel}</div>
                            <div className={styles.referentIn}>{referentIn}</div>
                            <div className={styles.zentriert}>
                                <div className={styles.datum}>{date} Uhr</div>
                                <div className={styles.untertitel}>{untertitel}</div>
                                <div className={styles.organisation}>{organisation}</div>
                            </div>
                            <TextElement {...beschreibung}></TextElement>

                            {/* Projekt Forschungsfelder tags */}
                            <div>Forschungsfelder</div>
                            {forschungsfeld.map((forschungsfeld) => {
                              let href=`/editorial`
                              // console.log("feld id ",forschungsfeld)
                              if(forschungsfeld.slug!=""){
                                  href+=`#${forschungsfeld.slug}`
                              }
                              return (
                                <Link href={href} key={forschungsfeld.slug}>
                                  <a className={styles.forschungsfeld}> 
                                     {/* wenn nicht auf editorial seite verlinken, dann
                                     hier übergeben, dass es den filter anwählt auf der projektseite
                                     onClick={() => props.addMoreItem(forschungsfeld.titel)} */}
                                    {forschungsfeld.titel} <br></br> 
                                  </a>
                                </Link>
                              )
                            })}
                          </Container>
                       </div>
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



export async function getStaticProps({params, locale}) {
    const data = await request({
        query: VERANSTALTUNGEINZEL,variables: { slug:params.slug, locale:locale},
      });

    return {
      props: {
        data,   
        params,
        ...await serverSideTranslations(locale, ['common']),
      }, // will be passed to the page component as props
    }
  }

// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
export async function getStaticPaths() {
    const paths = []
    return {
        paths, fallback: true 
    }
}
