import Layout from "../../components/Layout/layout"
import { request, PUBLIKATIONEINZEL } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'

export default function Publikationseinzelansicht (props) {
  const { t } = useTranslation('common')

// console.log("props", props)
// falls params oder slug nicht ankommen, zu leeren strings ändern mit zeile 9
  const {data:{publikationen:{
    titel,
    mitarbeit,
    id,
    bild,
    publikationsart,
    publikationsinhalte
    }=""}=""}=props || ""

    // console.log("publikationsinhalte", props)
    
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
   <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        <div className={styles.einzelwrapper}>
            <div className={styles.titel}>
              {titel}
            </div>

            <img 
                className={styles.image}
                src={bild.url} 
                alt={bild.alt} 
            />
           
            <div className={styles.modulareinhalte}>
                {publikationsinhalte != null &&
                publikationsinhalte.map((block) => {
                  // console.log("was ist hier los",block.id)
                    return (
                  <div key={block.id}>
                    {
                    block._modelApiKey === 'text' &&
                      <StructuredText data={block.text.value}></StructuredText>
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
              {/* Mitarbeit, falls welche da  */}
              {MitarbeitendenElement}
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
    const data = await request({
        query: PUBLIKATIONEINZEL,variables: { slug:params.slug, locale:locale},
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
