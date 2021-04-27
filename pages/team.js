import { request,MENSCHEN } from "../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from './team.module.scss'
// import styles from '../styles/Home.module.scss'
// hä? wie geht denn das? :(

const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
    // console.log("props",props);


    return(
      <>
      
            {allMenschens.map((mensch, index) => {
              // console.log("projekte", mensch.projekte)
              // einbauen sortieren nach mensch.funktion.titel
              // {menschen.funktion.titel}
           
              let PDFElement;
                if(mensch.publikationsliste != null && mensch.publikationsliste.url != null){
                    PDFElement= <a className={styles.publikationsliste} href={mensch.publikationsliste.url}>Publikationsliste</a> 
                }else{
                    PDFElement= <> </>
                }

              return(
                <div key={index}>
                  {/* Portrait Bild */}
                  <img 
                    className={styles.portrait}
                    src={mensch.portrait.url} 
                    alt={mensch.portrait.alt} 
                  />

                  <p className={styles.name}>
                    {mensch.name}
                  </p>
                  <a className={styles.email} href={`mailto:,${mensch.email}`}>
                    {/* wie soll man das schreiben? */}
                    {mensch.email}
                  </a><br></br>
                  <a className={styles.website} href={mensch.website} target="_blank">
                    {mensch.website}
                  </a>
                  
                  <StructuredText data={mensch.lebenslauf.value} />
               
                  
                 {/* auch ein if einbauen, oder haben eh alle projekte in der projektliste? */}
                  <div>
                      Projektliste <br></br>
                      {mensch.projekte.map((projekt, index) => {
                          // console.log("liste", projekt)
                        return (
                          // irgendwie anders verlinken zum projekt, vielleicht dann schauen, wenn die projektunterseiten da sind
                          <a 
                          // mit slug ersetzen = lücken mit strichli füllen
                          // href={projekt.titel} 
                          key={index}>
                              {projekt.titel}
                          </a>
                        )
                      })}
                  </div>
                
                {/* Publikaitonsliste, falls vorhanden */}
                
                {PDFElement}

                </div>
              )
            })}
            
            
            
            
           
      </>
    )
}

 export default Team;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
    const menschen = await request({
        query: MENSCHEN,
      });

    return {
      props: {
        menschen,   
      }, // will be passed to the page component as props
    }
  }

 

