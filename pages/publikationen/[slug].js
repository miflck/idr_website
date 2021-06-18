import Layout from "../../components/Layout/layout"
// import { request, PUBLIKATIONEINZEL } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Container from "../../components/Container/container";

export default function Publikationseinzelansicht (props) {
  const { t } = useTranslation('common')
  // const {data:{publikationen:{
  //   titel,
  //   mitarbeit,
  //   id,
  //   bild,
  //   info,
  //   publikationsinhalte
  //   }=""}=""}=props || ""
    
    if(props.data) {
    //   let MitarbeitendenElement;
    //             if(mitarbeit != null){
    //               MitarbeitendenElement= <>
    //                 <div>Mitarbeit</div>
    //                   {mitarbeit.map((mitarbeiterin) => {
    //                     let href=`/team`
    //                     if(mitarbeiterin.slug!=""){
    //                         href+=`/${mitarbeiterin.slug}`
    //                     }
    //                    return (
    //                         <Link href={href} key={mitarbeiterin.id}><a>{mitarbeiterin.name}<br></br></a></Link>
    //                       )
    //                     })}
    //                 </>
    //             }else{
    //               MitarbeitendenElement= <> </>
    //             }
  return (
   <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        <Container>
          {/* <div className={styles.einzelwrapper}>
            <div className={styles.titel}>
              {titel}
            </div>

            <img 
                className={styles.image}
                src={bild.url} 
                alt={bild.alt} 
            />

            {publikationsinhalte != null &&
                publikationsinhalte.map((block) => {
                    return (
                  <div key={block.id} className={styles.text} >
                    {
                    block._modelApiKey === 'text' &&
                      <StructuredText data={block.text.value}/>
                    }
                    {
                      block._modelApiKey === 'pdf' &&
                      <Link href={block.pdf.url}><a>Projekt PDF</a></Link>
                    }
                  </div>
                  )})
            }
            <div className={styles.info}>
              <StructuredText data={info.value}/>
            </div>

            <div className={styles.listenwrapper}>
                {MitarbeitendenElement}
            </div> 
      </div>  */}
      </Container>
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
