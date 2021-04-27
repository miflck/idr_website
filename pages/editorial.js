import { request,EDITORIALTEXTE } from "../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../styles/Home.module.css'

const Editorial =(props)=>{
  const {editorialtexte:{allEditorials}}=props;
    return(
      <>
            {allEditorials.map((editorial, index) => {
            //   console.log("editorial", editorial)
              return(
                <div key={index}>
                    {/* Forschungsfeld */}
                    <div>
                        {editorial.forschungsfeld.map((forschungsfeld, index) => {
                            return (
                                <p key={index}>{forschungsfeld.titel} </p>
                            )
                        })}
                    </div>
                    {/* Beitrag Text */}
                    <div>
                        {editorial.beitraege.map((beitrag, index) => {
                            return (
                                <StructuredText data={beitrag.text.value} key={index}/>
                            )
                        })}
                    </div>
                    {/* menschen */}
                    <div>
                        {editorial.menschen.map((mensch, index) => {
                            return (
                                <div key={index}>
                                    <p>Koordinator*in</p>
                                    <p>{mensch.name}</p>
                                </div>
                            )
                        })}
                    </div>

                    {/* Projektliste */}
                    <div>
                        {editorial.projekte.map((projekt, index) => {
                            return (
                                <p>
                                    <a key={index} 
                                    // href={projekt.url.irgendwieso}
                                    >
                                    {projekt.titel}
                                    </a>
                                </p>
                            )
                        })}
                    </div>


                </div>
              )
            })}  
      </>
    )
}

 export default Editorial;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
    const editorialtexte = await request({
        query: EDITORIALTEXTE,
      });

    return {
      props: {
        editorialtexte,   
      }, // will be passed to the page component as props
    }
  }