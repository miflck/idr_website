import Layout from "../../components/Layout/layout"
import styles from '../slug.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import Container from "../../components/Container/container";
import arborAPI from "../../lib/export_arbor_JSON"
import { useRouter } from 'next/router'

import Article from "../../components/Publicationtype/Article"
import AudioVisual from "../../components/Publicationtype/AudioVisual"
import BookSection from "../../components/Publicationtype/BookSection"
import Book from "../../components/Publicationtype/Book"
import ConferenceItem from "../../components/Publicationtype/ConferenceItem"
import MagazineArticle from "../../components/Publicationtype/MagazineArticle"
import Other from "../../components/Publicationtype/Other"
// import Report from "../../components/Publicationtype/Report"
// import Software from "../../components/Publicationtype/Software"
// import Thesis from "../../components/Publicationtype/Thesis"

// import {
//     article, 
//     audio_visual, 
//     book_section, 
//     book,
//     conference_item,
//     magazine_article,
//     other,
//     // report,
//     // software,
//     // thesis
//     } from "../../components/Publicationtype"


export default function Publikationseinzelansicht (props) {
  const { t } = useTranslation('common')
  let {publicationdata}=props || ""
  publicationdata = arborAPI;

  // userid aus ref rauslesen
  const router = useRouter()
if(props) {
  console.log("router.query.slug",router.query.slug,publicationdata[0].eprintid);
  
  // wenn ich hier ersetze durch router.query.slug gehts nicht mehr, also in der konsole, weiter zum article bin ich nicht gekommen aber habe jeweils in der publi liste auf article gefiltert und dann die oberste genommen, das ist swiss style englisch, das hat diese 14575 als eprintid
    var data = publicationdata.filter(v => v.eprintid.toString() === router.query.slug )[0];
    // console.log('publicationdata', publicationdata);
    // console.log('userid',data.userid);
    console.log('data nach filter der publicationdata', data)

 



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


    /* hier switchen für article etc. */
    /* json filtern durch userid */

const element = (data) => { 
  // data ist ein array of objects vermutlich weil filter ein array zurück gibt. 
  // deshalb data[0].type
 // console.log('data im element',data[0].type)
  switch (data.type) {
          case ('article'):
              return <Article {...data} />;

          case ('audio_visual'):
              return <AudioVisual {...publikation} />;
          
          case ('book_section'):
              return <BookSection {...publikation}  />;
          
          case ('book'):
              return <Book {...publikation} />;

          case ('conference_item'):
              return <ConferenceItem {...publikation} />;
          
          case ('magazine_article'):
              return <MagazineArticle {...publikation} />;
        
          case ('other'):
              return <Other {...publikation} />;
        
          // case ('report'):
          //     return <Report {...publikation} />;

          // case ('software'):
          //     return <Software {...publikation} />;

          // case ('thesis'):
          //     return <Thesis {...publikation} />;

          default:
              return null;
        }
      }

    
  return (
   <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        <Container>
        hallo <br></br>
        {router.query.slug}
            {element(data)}
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

export async function getStaticProps({locale}) {
    //  const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
      //const publicationdata = await res.json()
      const publicationdata=""
  return {
    props: {
      publicationdata,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

export async function getStaticPaths({locales}) {
  const paths = []
    return {
        paths, fallback: true 
    }
}
