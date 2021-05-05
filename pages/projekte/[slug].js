import Layout from "../../components/Layout/layout"
import { request, PROJEKTEINZEL } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'


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

      let MitarbeitendenElement;
                if(mitarbeit != null){
                  MitarbeitendenElement= <>
                    <div>Mitarbeit</div>
                      {mitarbeit.map((mitarbeiterin, index) => {
                        let href=`/team`
                        if(mitarbeiterin.slug!=""){
                            href+=`/${mitarbeiterin.slug}`
                        }
                       return (
                            <a key={index} href={href}>{mitarbeiterin.name}<br></br></a>
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
                  let href=`/team`
                  if(leitung.slug!=""){
                      href+=`/${leitung.slug}`
                  }
                  return (
                  <a key={index} href={href}>{leitung.name}</a>
                  )
                })}
          
          {/* Verantwortung  */}
          <div>Verantwortung</div>
              {verantwortung.map((verantwortung, index) => {
                let href=`/team`
                if(verantwortung.slug!=""){
                    href+=`/${verantwortung.slug}`
                }
                  return (
                  <a key={index} href={href}>{verantwortung.name}</a>
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
    const data = await request({
        query: PROJEKTEINZEL,variables: { slug:params.slug, locale:locale},
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
