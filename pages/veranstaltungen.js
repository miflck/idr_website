import { request,VERANSTALTUNGEN } from "../lib/datocms";
import { StructuredText } from "react-datocms";
// import styles from './team.module.scss'


const Veranstaltungen =(props)=>{
  const {veranstaltungen:{allVeranstaltungs}}=props;
    console.log("props",props);


    return(
      <>
               {allVeranstaltungs.map((veranstaltung, index) => {
                   return(
                       <>
                       {veranstaltung.titel}
                       {/* datum irgendwie time to datestring */}
                       </>
                   )

               })}
        
           
      </>
    )
}

 export default Veranstaltungen;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
    const veranstaltungen = await request({
        query: VERANSTALTUNGEN,
      });

    return {
      props: {
        veranstaltungen,   
      }, // will be passed to the page component as props
    }
  }

 

