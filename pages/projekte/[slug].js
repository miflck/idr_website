import Layout from "../../Components/Layout/layout"
import { request, PROJEKTEINZEL, ALLPROJEKTE,PROJEKTE } from "../../lib/datocms";
import styles from './projekte.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Container from '../../Components/Container/container'
import TextElement from '../../Components/ModularContent/TextElement'
import ImageElement from "../../Components/ModularContent/ImageElement";
import ButtonLink from '../../Components/ButtonLink/buttonLink'
import FilterLink from '../../Components/FilterLink/filterLink'
import { useRouter } from 'next/router'

import { Title } from "../../Components/Composition";
import { ServiceElement } from "../../Components/Composition";
import McWrapper from "../../Components/ModularContent/McWrapper";

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
    serviceBlocks,
    forschungsfeld,
    startdatum,
    enddatum
  }=""}=""}=props || ""


console.log("serviceBlocks",serviceBlocks)

    const router = useRouter()
    if(router.isFallback){
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Fallback")
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
        let background_style_small;
        let colors=[];
 
        forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
        })
        background_style_small={
          background: `linear-gradient(to right top , ${colors[0]}, ${colors[1] || "white"},)`
        }
         background_style={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
        }

        let background_op={
          background:`radial-gradient(ellipse at bottom,rgba(255,255,255,1),transparent),
                      linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,1))`
                      
        };

        let radial={
          background:`radial-gradient(ellipse 90% 100% at top left,${colors[0]},transparent),
                      radial-gradient(ellipse 90% 100% at top right,${colors[1] || "white"},transparent),
                      radial-gradient(circle at bottom, "red",transparent)`

                      
        };

        let radial_2={
          background:`
          radial-gradient(ellipse 80% 100% at top left,${colors[0]},transparent),
          radial-gradient(ellipse 80% 100% at top right,${colors[1] || "white"},transparent),
          radial-gradient(circle farthest-side , #ffffff,transparent);`,

        };



  return (
  <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
    
    {/* Hintergrund ganze seite */}
    <div className={styles.hintergrund} style={background_style}></div>

    {/* Hintergrund fade */}
    <div className={styles.gradientOpacity} style={background_style}>
      <div className={styles.hintergrund_2} style={background_op}></div>
    </div>

    <div className={styles.slugwrapper}>
      <Container>
        <Title title={titel}/>

        <div className={styles.modulareinhalte}>
          {projektinhalte != null &&
            projektinhalte.map((block) => {
            return (
              <McWrapper>
              <div key={block.id}>
                {
                block._modelApiKey === 'text' &&
                  <TextElement {...block.text}></TextElement>
                }
                {
                  block._modelApiKey === 'einzelbild' &&
                  <ImageElement src={block.einzelbild.url} />
                }
                {
                  block._modelApiKey === 'pdf' &&
                  <ButtonLink {...block} href={block.pdf.url}/>
                }
              </div>
              </McWrapper>
            )})
          }
        </div>
        </Container>

        <Container>

        <div className={styles.listenwrapper}> 
        <ServiceElement title=  {t("Zeitraum")}>
          {startzeitraum} – {endzeitraum}
        </ServiceElement>

        <ServiceElement title=  {t("Forschungsfelder")}>
          {forschungsfeld.map((forschungsfeld) => {
            var filtermitgeben = `${forschungsfeld.titel}`.split(" ").join("-");
            return (
              <FilterLink props={forschungsfeld.titel} href={{ pathname: '/editorial', query: { keyword: `${filtermitgeben}` } }}/>
            )
          })}        
        </ServiceElement>





        <ServiceElement title=  {t("Leitung")}>
        {leitung.map((leitung) => {
              let href=`/team`
              if(leitung.slug!=""){
                href+=`/${leitung.slug}`
              }
              return (
                <ButtonLink {...leitung} href={href}/>
              )
            })}
        </ServiceElement>


          {verantwortung != "" &&
            <ServiceElement title= {t("Verantwortung")}>
            {verantwortung.map((e) => {
                let href=`/team`
                if(e.slug!=""){
                    href+=`/${e.slug}`
                }
                return (
                  <ButtonLink {...e} href={href}/>
                )
              })}
            </ServiceElement>
          }

        {mitarbeit != "" &&
            <ServiceElement title= {t("Mitarbeit")}>
            {mitarbeit.map((e) => {
                let href=`/team`
                if(e.slug!=""){
                    href+=`/${e.slug}`
                }
                return (
                  <ButtonLink {...e} href={href}/>
                )
              })}
            </ServiceElement>
          }

{serviceBlocks != null &&
            serviceBlocks.map((block) => {
              return(
                <ServiceElement key={block.key} title=  {block.title}>
                   {block.persons.map((person) => {
                     let href=`/team`
                     if(person.slug!=""){
                         href+=`/${person.slug}`
                     }
                     return (
                       <ButtonLink {...person} href={href}/>
                     )
                   })
                  }
              </ServiceElement>
              )
            })
        }
          
        <ServiceElement title=  {t("Kooperationen")}>
          <TextElement {...kooperationen}/>
        </ServiceElement>

        <ServiceElement title=  {t("Finanzierung")}>
          <TextElement {...finanzierung}/>
        </ServiceElement>
          
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

  console.log("*****************", params)

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
  
 const projekte = await request({
  query: ALLPROJEKTE,
});
  locales.forEach((locale, i) => {
    projekte.allProjekts.forEach((projekt, j) => {
      paths.push({ 
        params: { 
          slug:projekt.slug
        }, 
        locale})
    })
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
      paths, fallback: false
    }
}
