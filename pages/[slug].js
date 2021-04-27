// alles was es nicht findet hauts nun in diese rein, also alle 404 error seiten

import Head from 'next/head'
import { request, PROJEKTEINZEL } from "../lib/datocms";
import { StructuredText } from "react-datocms";


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
    projektinhalte,
    }=""}=""}=props || ""

  return (
   <div>
       {titel}




       {/* hier Component einbauen wie SliceZone für Projektinhalte */}




       {/* Leitung */}
       <div>
            Leitung <br></br>
            {leitung.map((leitung, index) => {
                return (
                <div>{leitung.name}</div>
                )
              })}
        </div>
        {/* Verantwortung */}
        <div>
            Verantwortung <br></br>
            {verantwortung.map((verantwortung, index) => {
                return (
                <div>{verantwortung.name}</div>
                )
              })}
        </div>
        {/* Mitarbeit, falls welche da */}
        <div>
                {mitarbeit.map((mitarbeit, index) => {
                    let MitarbeitElement;
                    if(mitarbeit != null && mitarbeit.name != null){
                        MitarbeitElement= <div> {mitarbeit.name}</div> 
                    }else{
                        MitarbeitElement= <> </>
                    }
                    return (
                    <MitarbeitElement/>
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