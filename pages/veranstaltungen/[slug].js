import Layout from "../../components/Layout/layout"
import { request, VERANSTALTUNGEINZEL } from "../../lib/datocms";
import styles from './veranstaltungen.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Container from '../../components/Container/container'
import TextElement from "../../components/TextElement/TextElement";
import ButtonLink from "../../components/ButtonLink/ButtonLink";


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
  
    const { t } = useTranslation('common')

    const date = new Date(datum).toLocaleString([], {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: '2-digit', minute: '2-digit'});

      if(props.data) {

        let background_style;
        let colors=[];

        forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
        })
        background_style={
            background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
        }
        let background_style_small={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`
        }

    return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        <div className={styles.slugwrapper} style={background_style}>
          {/* <div className={styles.veranstaltungscontent} key={id}> */}
            <Container>
              <div className={styles.speztitel}>
                {titel}
              </div>
              <div className={styles.referentIn}>
                {referentIn}
              </div>

              <div className={styles.zentriert}>
                <div className={styles.datum}>{date} Uhr</div>
                <div className={styles.untertitel}>{untertitel}</div>
                <div className={styles.organisation}>{organisation}</div>
              </div>

              <div className={styles.subwrapper}>
                <TextElement {...beschreibung}/>
              </div>

              <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Forschungsfelder</div>
                {forschungsfeld.map((forschungsfeld) => {
                  let href=`/editorial`
                  if(forschungsfeld.slug!=""){
                  href+=`#${forschungsfeld.slug}`
                  }
                  return (
                    <ButtonLink {...forschungsfeld} href={href}/>
                  )
                })}
              </div>
            </Container>
          {/* </div> */}
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
