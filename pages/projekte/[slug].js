import Layout from "../../components/Layout/layout"
import { request, PROJEKTEINZEL,ALLPROJEKTE } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export default function Projekteinzelansicht (props) {

  const { t } = useTranslation('common')
// console.log("props", props)
// falls params oder slug nicht ankommen, zu leeren strings ändern mit zeile 9
  const {data:{projekt:{
    titel,
    id,
    leitung,
    verantwortung,
    mitarbeit,
    kooperationen,
    finanzierung,
    projektinhalte
    }=""}=""}=props || ""

    // console.log("projektinhalte", props)

    if(props.data) {
      let MitarbeitendenElement;
                if(mitarbeit != null){
                  MitarbeitendenElement= <>
                    <div>Mitarbeit</div>
                      {mitarbeit.map((mitarbeiterin) => {
                        let href=`/team`
                        if(mitarbeiterin.slug!=""){
                            href+=`/${mitarbeiterin.slug}`
                        }
                       return (
                            <Link href={href} key={mitarbeiterin.id}><a>{mitarbeiterin.name}<br></br></a></Link>
                          )
                        })}
                    </>
                }else{
                  MitarbeitendenElement= <> </>
                }
    
  return (
   <Layout>
        <div className={styles.einzelwrapper}>
        <div className={styles.titel}>
          {titel}
        </div>
        <div className={styles.modulareinhalte}>
            {projektinhalte != null &&
            projektinhalte.map((block) => {
              // console.log(block)
                return (
                // index ist eigentlich nur zur not, es kann dann immer noch mehrer mit demselben key geben. besser wäre wohl die ID des elementes aus dato

              <div key={block.id}>
                {
                block._modelApiKey === 'text' &&
                  <StructuredText data={block.text.value}></StructuredText>
                }
                {
                  block._modelApiKey === 'einzelbild' &&
                  <img src={block.image.url}/>
                }
                {
                  block._modelApiKey === 'pdf' &&
                  <Link href={block.pdf.url}><a>Projekt PDF</a></Link>
                }
              </div>
              )})
            }
        </div>
            
        <div className={styles.listenwrapper}> 
          {/* 
          Leitung  
          - ev ein Component daraus machen? weil leitung, verantwortung,mitarbeit, Finanzierung etc immer dasselbe element?
          ja vielleicht :), vielleicht auch nur kosmetik? ich weiss es nicht :) 
          - die a mit Link ersetzen… gemacht
          */}
          <div>Leitung</div>
              {leitung.map((leitung) => {
                // console.log("leitung", leitung)
                  let href=`/team`
                  if(leitung.slug!=""){
                      href+=`/${leitung.slug}`
                  }
                  return (
                  <Link href={href} key={leitung.id}><a>{leitung.name}</a></Link>
                  )
                })}
          
          {/* Verantwortung  */}
          <div>Verantwortung</div>
              {verantwortung.map((verantwortung) => {
                let href=`/team`
                if(verantwortung.slug!=""){
                    href+=`/${verantwortung.slug}`
                }
                  return (
                  <Link href={href} key={verantwortung.id}><a>{verantwortung.name}</a></Link>
                  )
                })}
          {/* Mitarbeit, falls welche da  */}
                {MitarbeitendenElement}

          <div>Kooperationen</div>
              <StructuredText data={kooperationen.value} />
          
          <div>Finanzierung</div>
          <StructuredText data={finanzierung.value} />
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

  // console.log("+++++++++++++++++++++++",locale)
    const data = await request({
        query: PROJEKTEINZEL,variables: { slug:params.slug, locale:locale},
      });

    return {
      props: {
        data,   
        params,
        locale,
        ...await serverSideTranslations(locale, ['common']),
      }, // will be passed to the page component as props
    }
  }

  
// die brauchen wir, um zu verhindern, dass es alle möglichen seiten rendert, sondern nur die, die wie brauchen
//-> nicht ganz, die brachen wir, falls wir auf dem server prerendern wollen. also statische seiten generieren, damit die maschine weiss, welche seiten zu generieren sind glaubs
export async function getStaticPaths({locales}) {
  const paths = [] 

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
        paths, fallback: true 
    }
}
