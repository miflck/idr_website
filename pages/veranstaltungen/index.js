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
                              <p className={styles.title}>{veranstaltung.titel}</p>
                              <p className={styles.referentIn}>{veranstaltung.referentIn}</p>
                              <div className={styles.zentriert}>
                                  <p className={styles.datum}>{datum} Uhr</p>
                                  <p className={styles.untertitel}>{veranstaltung.untertitel}</p>
                                  <p className={styles.organisation}>{veranstaltung.organisation}</p>
                              </div>
                              <p className={styles.beschreibung}>
                                <StructuredText data={veranstaltung.beschreibung.value}/>
                              </p>
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

 

