import Layout from "../../Components/Layout/layout"
import { request, PROJEKTEINZEL, ALLPROJEKTE } from "../../lib/datocms";
import styles from './projekte.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Container from '../../Components/Container/container'
import TextElement from '../../Components/TextElement/textElement'
import ButtonLink from '../../Components/ButtonLink/buttonLink'
import FilterLink from '../../Components/FilterLink/filterLink'
import { useRouter } from 'next/router'

export default function Projekteinzelansicht (props) {
  const { t } = useTranslation('common')
// console.log("props vergleich projekt", props)
  const {data:{projekt:{
    titel,
    id,
    leitung,
    verantwortung,
    mitarbeit,
    kooperationen,
    finanzierung,
    projektinhalte,
    forschungsfeld,
    startdatum,
    enddatum
    }=""}=""}=props || ""

    const router = useRouter()
    if(router.isFallback){
      return <div>Loading…</div>
    }

    if(props.data) {
      let MitarbeitendenElement;
                if(mitarbeit != ""){
                  MitarbeitendenElement= <>
                    <div className={styles.subtitel}>{t("Mitarbeit")}</div>
                      {mitarbeit.map((mitarbeiterin) => {
                        let href=`/team`
                        if(mitarbeiterin.slug!=""){
                            href+=`/${mitarbeiterin.slug}`
                        }
                       return (
                        <ButtonLink {...mitarbeiterin} href={href}/>
                          )})}
                    </>
                }else{
                  MitarbeitendenElement= <> </>
                }
        let VerantwortungElement;
                if(verantwortung != ""){
                  VerantwortungElement= 
                  <>
                    <div className={styles.subtitel}>{t("Verantwortung")}</div>
                    {verantwortung.map((verantwortung) => {
                      let href=`/team`
                      if(verantwortung.slug!=""){
                          href+=`/${verantwortung.slug}`
                      }
                      return (
                        <ButtonLink {...verantwortung} href={href}/>
                      )
                    })}
                  </>
                }else{
                  VerantwortungElement= <> </>
                }

        var options = { year: 'numeric', month: 'long'};
        const startzeitraum = new Date(startdatum).toLocaleDateString(router.locale, options);
        const endzeitraum = new Date(enddatum).toLocaleDateString(router.locale, options);

        
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

  return (
  <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
    <div className={styles.slugwrapper} style={background_style}>
      <Container>
        <div className={styles.titel}>
          {titel}
        </div>
        <div className={styles.modulareinhalte}>
          {projektinhalte != null &&
            projektinhalte.map((block) => {
            return (
              <div key={block.id}>
                {
                block._modelApiKey === 'text' &&
                  <TextElement {...block.text}></TextElement>
                }
                {
                  block._modelApiKey === 'einzelbild' &&
                  <img src={block.einzelbild.url}/>
                }
                {
                  block._modelApiKey === 'pdf' &&
                  <ButtonLink {...block} href={block.pdf.url}/>
                }
              </div>
            )})
          }
        </div>
            
        <div className={styles.listenwrapper}> 

          <div>
            <div className={styles.subtitel}>
              {t("Zeitraum")}
              </div>
            {startzeitraum} – {endzeitraum}
          </div>

          <div>
            <div className={styles.subtitel}>
              {t("Forschungsfelder")}
              </div>
            {forschungsfeld.map((forschungsfeld) => {
              var filtermitgeben = `${forschungsfeld.titel}`.split(" ").join("-");
              console.log("filter mitgeben forschungsfeld", filtermitgeben)
              return (
                <FilterLink props={forschungsfeld.titel} href={{ pathname: '/editorial', query: { keyword: `${filtermitgeben}` } }}/>
              )
            })} 
          </div>

          <div>
          <div className={styles.subtitel}>{t("Leitung")}</div>
            {leitung.map((leitung) => {
              let href=`/team`
              if(leitung.slug!=""){
                href+=`/${leitung.slug}`
              }
              return (
                <ButtonLink {...leitung} href={href}/>
              )
            })}
          </div>
          
          <div>
            {VerantwortungElement}
          </div>

          <div>
          {MitarbeitendenElement}
          </div>

          <div>
            <div className={styles.subtitel}>{t("Kooperationen")}</div>
            <TextElement {...kooperationen}/>
          </div>

          <div>
            <div className={styles.subtitel}>{t("Finanzierung")}</div>
            <TextElement {...finanzierung}/>
          </div>
          
        </div>
      </Container>
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
        query: PROJEKTEINZEL,variables: { slug:params.slug, locale:locale},
      });
    return {
      props: {
        data,   
        params,
        locale,
        ...await serverSideTranslations(locale, ['common']),
      }
    }
  }

  
// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
//-> nicht ganz, die brachen wir, falls wir auf dem server prerendern wollen. also statische seiten generieren, damit die maschine weiss, welche seiten zu generieren sind glaubs
export async function getStaticPaths({locales}) {
  const paths = [] 
  
  locales.forEach((locale, i) => {

  paths.push({ 
    params: { 
      slug:"mikafiintelligenteskaffeeroestenzuhause"
    }, 
    locale})



  paths.push({ 
    params: { 
      slug:"geldschein-zur-visuellen-rhetorik-des-geldes"
    }, 
    locale})

  })
  


 
  // Irgendwie so würde man wohl die pfade finden
  /*
  const data = await request({
    query: ALLPROJEKTE
  });
  // loop durch die sprachen
  locales.forEach((locale, i) => {
    data.allProjekts.forEach((projekt, j) => {
      console.log(locale,projekt)
      paths.push({ 
        params: { 
          slug:projekt.slug
        }, 
        locale})

      }
    )
  }
  )*/
    return {
        paths, fallback: 'blocking'
    }
}
