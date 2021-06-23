import Layout from '../../components/Layout/layout'
import { request, MENSCHEINZEL } from "../../lib/datocms";
import styles from './team.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Container from '../../components/Container/container'
import TextElement from '../../components/TextElement/TextElement'
import ButtonLink from '../../components/ButtonLink/ButtonLink'

export default function Menscheinzelansicht (props) {
  const { t } = useTranslation('common')
  console.log("props vergleich team", props)
  const {data:{menschen:{
    name,
    id,
    slug,
    forschungsfeld,
    portrait,
    lebenslauf,
    email,
    website,
    publikationsliste
    }=""}=""}=props || ""
    
  const {data:{allProjekts}=""}=props || ""
    if(props.data) { 

        console.log("props team slug", props)
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
                    <Link href={website} target="_blank">
                      <a className={styles.website}>
                        {website}
                      </a>
                    </Link>
                  </div>
                }
    
      return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
          <div className={styles.slugwrapper}>
          <Container>
            <div className={styles.titel}>
              {name}
            </div>


            <img 
              className={styles.portrait}
              src={portrait.url} 
              alt={portrait.alt} 
             />
          
            <div className={styles.subwrapper}>
                {EmailElement}
                {WebsiteElement}
            </div>
          
            <div className={styles.subwrapper}>
              <div className={styles.subtitel}>Lebenslauf</div>
              <TextElement {...lebenslauf}></TextElement>
            </div>

            <div className={styles.subwrapper}>
                  <div className={styles.subtitel}>Projekte</div>
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

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Tätigkeitsfelder </div>
                {forschungsfeld.map((forschungsfeld) => {
                  return (
                  <div key={forschungsfeld.titel} className={styles.projekt}>
                    <a>{forschungsfeld.titel}</a>
                  </div>
                  )
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
export async function getStaticPaths() {
    const paths = []
    return {
        paths, fallback: true 
    }
}
