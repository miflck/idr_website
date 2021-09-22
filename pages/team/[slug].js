import Layout from '../../Components/Layout/layout'
import { request, MENSCHEINZEL,ALLMENSCHEN } from "../../lib/datocms";
import styles from './team.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Container from '../../Components/Container/container'
import ButtonLink from '../../Components/ButtonLink/buttonLink'
import FilterLink from '../../Components/FilterLink/filterLink'

import { Title } from "../../Components/Composition";
import TextElement from '../../Components/Composition/TextElement'
import ImageElement from "../../Components/Composition/ImageElement";


export default function Menscheinzelansicht (props) {
  const { t } = useTranslation('common')
  // console.log("props vergleich team", props)
  const {data:{menschen:{
    name,
    id,
    slug,
    forschungsfeld,
    portrait,
    lebenslauf,
    bfhprofil,
    email,
    website,
    publikationsliste
    }=""}=""}=props || ""
    
  const {data:{allProjekts}=""}=props || ""
    if(props.data) { 

        // console.log("props team slug", props)
       function filterBy(data, filterterm) {
          return data.filter((obj) => {
              return obj.mitarbeit.some((feld)=> {
                return feld.name.includes(filterterm);
              })
          })
        }
        const filterdProjectlist = filterBy(allProjekts, name)
        // console.log("props team slug", filterdProjectlist)

                let PDFElement;
                if(publikationsliste[0] != null && publikationsliste[0].pdf.url != null){
                    PDFElement= 
                    <div className={styles.subwrapper}>
                        <ButtonLink {...publikationsliste[0]} href={publikationsliste[0].pdf.url}/>
                    </div> 
                }
                let EmailElement;
                if(email != ""){
                  EmailElement= <div><Link href={`mailto:,${email}`}><a className={styles.email}>{email}</a></Link></div>
                }
                let WebsiteElement;
                if(website != ""){
                  WebsiteElement= 
                  <div>
                    <Link href={website}>
                      <a className={styles.website} target="_blank">
                        {website}
                      </a>
                    </Link>
                  </div>
                }
                let BFHProfilElement;
                if(bfhprofil != ""){
                  BFHProfilElement= 
                  <div className={styles.bfhprofil}>
                    <Link href={bfhprofil}>
                      <a className={styles.bfhprofil} target="_blank">
                        {t("BFHProfil")}
                      </a>
                    </Link>
                  </div>
                }

                let ProjekteElement;
                if(filterdProjectlist.length != 0) {
                  // console.log("filterdProjectlist",filterdProjectlist)
                  ProjekteElement=
                  <div className={styles.subwrapper}>
                        <div className={styles.subtitel}>{t("Projekte")}</div>
                        {filterdProjectlist.map((projekt) => {
                          let href=`/projekte`
                          if(projekt.slug!=""){
                              href+=`/${projekt.slug}`
                          }
                          return (
                              <ButtonLink {...projekt} href={href}/>
                          )
                        })}
                  </div>
                }

        let background_style;
        let colors=[]; 
        if(forschungsfeld.length != 0) {
          forschungsfeld.map((forschungsfeld) => {
            // console.log("farbe hats oder nicht", forschungsfeld.titel)
            if(forschungsfeld.titel === "ForscherInnen") {
            } else if (forschungsfeld.titel === "Leitung und Büro") {
            }
            else{
              colors.push(forschungsfeld.colour.hex)
            }
          })
        }
        background_style={
            background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
        }
        let background_style_small={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`
        }
      
    
  return (

    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
        <div className={styles.hintergrund} style={background_style}></div>
        
          <div className={styles.slugwrapper}>
          <Container>
          <Title title={name}/>
          <ImageElement src={portrait.url}  alt={portrait.alt} />


            <img 
              className={styles.portrait}
              src={portrait.url} 
              alt={portrait.alt} 
             />
          
            <div className={styles.subwrapper}>
                {EmailElement}
                {WebsiteElement}
                <br></br>
                {BFHProfilElement}
            </div>

            {ProjekteElement}

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Forschungsfelder")}</div>
                {forschungsfeld.map((forschungsfeld) => {
                  console.log("forschungsfeld",forschungsfeld)
                  if(forschungsfeld.titel === "ForscherInnen") {
                  } else if (forschungsfeld.titel === "Leitung und Büro") {
                  }else{
                     var forschungsfeldlink = forschungsfeld.titel
                     var filtermitgeben = `${forschungsfeld.titel}`.split(" ").join("-");
                  
                  return (
                  <div key={forschungsfeld.titel} className={styles.projekt}>
                    {/* {forschungsfeldlink} */}
                    <FilterLink props={forschungsfeldlink} href={{ pathname: '/editorial', query: { keyword: `${filtermitgeben}` } }}/>
                  </div>
                  )
                  }
                })}
            </div>

              {PDFElement}
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
        query: MENSCHEINZEL,variables: { slug:params.slug, locale:locale},
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
export async function getStaticPaths({locales}) {
    const paths = []

    const m = await request({
      query: ALLMENSCHEN,
    });
    
      locales.forEach((locale, i) => {
        m.allMenschens.forEach((mensch, j) => {
          paths.push({ 
            params: { 
              slug:mensch.slug
            }, 
            locale})
        })
      })

    return {
        paths, fallback: false 
    }
}
