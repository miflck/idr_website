import { request,VERANSTALTUNGEN } from "../../lib/datocms"
import { StructuredText } from "react-datocms"
import styles from './veranstaltungen.module.scss'
import Layout from '../../components/Layout/layout'
import Link from 'next/link'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Veranstaltungen =(props)=>{
  const {veranstaltungen:{allVeranstaltungs}}=props;
    // console.log("props",props);
    const { t } = useTranslation('common')
    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        <div className={styles.veranstaltungswrapper} >
            {allVeranstaltungs.map((veranstaltung) => {
              let href=`/veranstaltungen`
              if(veranstaltung.slug!=""){
                  href+=`/${veranstaltung.slug}`
              }

                const datum = new Date(veranstaltung.datum).toLocaleString([], {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit'});
                    return(
                    <Link href={href}>
                      <div className={styles.veranstaltungslink}>
                        <div className={styles.veranstaltungscontent} key={veranstaltung.id}>
                              <div className={styles.title}>{veranstaltung.titel}</div>
                              <div className={styles.referentIn}>{veranstaltung.referentIn}</div>
                              <div className={styles.zentriert}>
                                  <div className={styles.datum}>{datum} Uhr</div>
                                  <div className={styles.untertitel}>{veranstaltung.untertitel}</div>
                                  <div className={styles.organisation}>{veranstaltung.organisation}</div>
                              </div>
                              <div className={styles.beschreibung}>
                                <StructuredText data={veranstaltung.beschreibung.value}/>
                              </div>
                        </div>
                       </div>
                    </Link>
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

 

