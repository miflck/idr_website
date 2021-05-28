import { request, NEWS } from "../lib/datocms";
// import styles from '../styles/Home.module.scss'
import styles from './news.module.scss'
import Layout from '../components/Layout/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export default function Home(props) {
  // const {news:{news}}=props;
  const {news:{news:{links}}}=props;
  console.log("homeprops", links);
  const { t } = useTranslation('common')

  return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
      <main className={styles.container}>
        
      <div className={styles.allekacheln}>
        {links.map((beitrag) => {
          // console.log("beitrag", beitrag)
          let hrefprojekte=`/projekte`
          if(beitrag._modelApiKey === 'projekt') {
            hrefprojekte+=`/${beitrag.slug}`
          }
          let hrefveranstaltungen=`/veranstaltungen`
          if(beitrag._modelApiKey === 'veranstaltung') {
            hrefveranstaltungen+=`/${beitrag.slug}`
          }
          let hrefpublikationen=`/publikationen`
          if(beitrag._modelApiKey === 'publikationen') {
            hrefpublikationen+=`/${beitrag.slug}`
          }

          const date = new Date(beitrag.datum).toLocaleString([], {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit'});

              return(
                <div className={styles.kachelwrapper} key={beitrag.id}>
                    {
                    beitrag._modelApiKey === 'projekt' &&
                    <Link href={hrefprojekte}
                    >
                      <div className={styles.kachel}>
                        <div className={styles.text}>
                          <div className={styles.uebertitel}>Projekt</div>
                          <div className={styles.titel}>{beitrag.titel}</div>
                        </div>
                      </div>
                    </Link>
                    }
                    {
                      beitrag._modelApiKey === 'veranstaltung' &&
                      <Link href={hrefveranstaltungen}
                      >
                        <div className={styles.kachel}>
                          <div className={styles.text}>
                            <div className={styles.uebertitel}>Veranstaltung</div>
                            <div className={styles.titel}>{beitrag.titel}</div>
                            <div className={styles.date}>{date} Uhr</div>
                          </div>
                        </div>
                      </Link>
                    }
                    {
                      beitrag._modelApiKey === 'publikationen' &&
                      <Link href={hrefpublikationen}>
                        <div className={styles.kachel}>
                            <div className={styles.text}>
                              <div className={styles.uebertitel}>Publikation</div>
                              <div className={styles.titel}>{beitrag.titel}</div>
                            </div>
                            <div className={styles.bild}>
                              <img
                                  className={styles.image}
                                  src={beitrag.bild.url} 
                                  alt={beitrag.bild.alt} 
                                />
                            </div>
                       
                        </div>
                      </Link>
                    }
                </div>
              )
              })}
        </div>
       
      </main>
    </Layout>
  )
}


export async function getStaticProps({locale}) {
  const news = await request({
    query: NEWS, variables: {locale:locale},
  });

  return {
    props: {
      news,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}