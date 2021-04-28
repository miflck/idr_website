// alles was es nicht findet hauts nun in diese rein, also alle 404 error seiten

import Head from 'next/head'
import { request, PROJEKTEINZEL } from "../lib/datocms";
import { StructuredText } from "react-datocms";
// import SliceZone  from '../components/Slices/SliceZone';


export default function Projekteinzelansicht (props) {
console.log("props", props)
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
   <div>

      {titel}

      <div>
        { projektinhalte != null &&
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
              <a href={block.pdf.url}>PDF</a>
            }
          </div>
          )})
        }
      </div>
  
        {/* Leitung  */}
       <div>
            Leitung <br></br>
            {leitung.map((leitung, index) => {
              console.log("leitung", leitung)
                return (
                <a key={index} href={leitung.slug}>{leitung.name}</a>
                )
              })}
        </div>
         {/* Verantwortung  */}
        <div>
            Verantwortung <br></br>
            {verantwortung.map((verantwortung, index) => {
                return (
                <a key={index} href={verantwortung.slug}>{verantwortung.name}</a>
                )
              })}
        </div>
        {/* Mitarbeit, falls welche da  */}
        <div>
            { mitarbeit != null &&
              mitarbeit.map((mitarbeiterin, index) => {
              // console.log("mitarbeit", mitarbeiterin)
                return (
                  <a key={index} href={mitarbeiterin.slug}>{mitarbeiterin.name}</a>
                )
              })}
        </div>
        <div>
            Kooperationen
            <StructuredText data={kooperationen.value} />
        </div>
        <div>
            Finanzierung
        <StructuredText data={finanzierung.value} />
            </div>
        
         
   </div>
  
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
