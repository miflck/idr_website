// alles was es nicht findet hauts nun in diese rein, also alle 404 error seiten

import Layout from "../../components/Layout/layout"
import { request, PROJEKTEINZEL } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'




// Publikationseinzelansicht neu machen









export default function Projekteinzelansicht (props) {
// console.log("props", props)
// falls params oder slug nicht ankommen, zu leeren strings ändern mit zeile 9
  const {data:{projekt:{
    titel,
    leitung,
    verantwortung,
    mitarbeit,
    kooperationen,
    finanzierung,
    projektinhalte
    }=""}=""}=props || ""

    // console.log("projektinhalte", props)

    if(props.data) {
    
  return (
   <Layout>
        <div className={styles.projekteinzelwrapper}>
        <div className={styles.titel}>
          {titel}
        </div>
        <div className={styles.modulareinhalte}>
            {projektinhalte != null &&
            projektinhalte.map((block, index) => {
              // console.log(block)
                return (
              <div key={index}>
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
                  <a href={block.pdf.url}>Projekt PDF</a>
                }
              </div>
              )})
            }
        </div>
            
        <div className={styles.listenwrapper}> 
          {/* Leitung  */}
          <div>Leitung</div>
              {leitung.map((leitung, index) => {
                // console.log("leitung", leitung)
                  return (
                  <a key={index} href={leitung.slug}>{leitung.name}</a>
                  )
                })}
          
          {/* Verantwortung  */}
          <div>Verantwortung</div>
              {verantwortung.map((verantwortung, index) => {
                  return (
                  <a key={index} href={verantwortung.slug}>{verantwortung.name}</a>
                  )
                })}
          {/* Mitarbeit, falls welche da  */}
          <div>Mitarbeit</div>
              { mitarbeit != null &&
                mitarbeit.map((mitarbeiterin, index) => {
                // console.log("mitarbeit", mitarbeiterin)
                  return (
                    <a key={index} href={mitarbeiterin.slug}>{mitarbeiterin.name}<br></br></a>
                  )
                })}
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


export async function getStaticProps({params}) {
    const data = await request({
        query: PROJEKTEINZEL,variables: { slug:params.slug},
      });

    return {
      props: {
        data,   
        params
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
