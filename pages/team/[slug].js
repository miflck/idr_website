import Layout from '../../components/Layout/layout'
import { request, MENSCHEINZEL } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Container from '../../components/Container/container'

export default function Menscheinzelansicht (props) {

  const { t } = useTranslation('common')
  const {data:{menschen:{
    name,
    id,
    slug,
    filtertag,
    portrait,
    lebenslauf,
    email,
    website,
    projekte,
    publikationsliste
    }=""}=""}=props || ""

    console.log(props)
    if(props.data) {
                let PDFElement;
                if(publikationsliste != null && publikationsliste.url != null){
                    PDFElement= <div className={styles.pdf}><Link href={publikationsliste.url}><a>Publikationsliste</a></Link></div> 
                }else{
                    PDFElement= <> </>
                }
                let EmailElement;
                if(email != ""){
                  EmailElement= <div><Link href={`mailto:,${email}`}><a className={styles.email}>{email}</a></Link></div>
                }else{
                  EmailElement= <> </>
                }
                let WebsiteElement;
                if(website != ""){
                  WebsiteElement= <div><Link href={website} target="_blank"><a className={styles.website}>{website}</a></Link></div>
                }else{
                  WebsiteElement= <> </>
                }
    
      return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
          <div className={styles.einzelwrapper}>
          <Container>
            <div className={styles.titel}>
              {name}
            </div>

            {/* Portrait Bild */}
            <img 
              className={styles.portrait}
              src={portrait.url} 
              alt={portrait.alt} 
             />
          
            <div className={styles.links}>
                {EmailElement}
                {WebsiteElement}
            </div>
          
            <div className={styles.text}>
              <StructuredText data={lebenslauf.value} />
            </div>

              <div className={styles.projektliste}>
                  {/* Projektliste <br></br> */}
                  {projekte.map((projekt) => {
                    // console.log("liste", projekt)
                    let href=`/projekte`
                    if(projekt.slug!=""){
                        href+=`/${projekt.slug}`
                    }
                    return (
                      <div key={projekt.id} className={styles.projekt}> 
                          <Link href={href}>
                            <a>
                              {projekt.titel}
                            </a>
                          </Link>
                      </div>
                    )
                  })}
              </div>

              {filtertag.map((filtertag) => {
                return (
                <div key={filtertag.titel} className={styles.projekt}>
                  <a>{filtertag.titel}</a>
                </div>
                )
              })}

              {/* Publikaitonsliste, falls vorhanden */}
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
