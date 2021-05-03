import { request,MENSCHEN } from "../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from './team.module.scss'
import Layout from '../components/Layout/layout'

const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
    console.log("props",props);

    return(
      <Layout>
      
            {allMenschens.map((mensch, index) => {
              // console.log("projekte", mensch.projekte)
              // einbauen sortieren nach mensch.funktion.titel
              // let funktionsid = {mensch.funktion.titel}

              // {menschen.funktion.titel}
              // let FunktionsElement;
              // let string1 = "ForscherInnen"
              // let string2 = "Leitung und Büro"
              // let stringtotest = `${mensch.funktion.titel}`
              // console.log('funktion',stringtotest)

              // if(string1.equals(stringtotest)) {
              //   FunktionsElement = <div className={styles.forscherinnen}> hier alle forscherinnen, {mensch.name} </div>
              // }
              // else if(string2.equals(stringtotest)){
              //   FunktionsElement = <div className={styles.leitungundbuero}> hier alle büros, {mensch.name} </div>
              // }
              // Büro hat ID 34114834
              //ForscherInnen hat ID 34114835
              // let numericStringArray = ['34114835', '34114834'];
              // let numericStringArray = [`${mensch.funktion.titel}`];
              // numericStringArray.sort();
              // console.log('sortierennummer',numericStringArray)

              let PDFElement;
                if(mensch.publikationsliste != null && mensch.publikationsliste.url != null){
                    PDFElement= <div className={styles.pdf}>
                                    <a href={mensch.publikationsliste.url}>Publikationsliste</a>
                                    </div> 
                }else{
                    PDFElement= <> </>
                }


                let EmailElement;
                if(mensch.email != ""){
                  EmailElement= <div><a className={styles.email} href={`mailto:,${mensch.email}`}> {mensch.email} </a></div>
                }else{
                  EmailElement= <> </>
                }


                let WebsiteElement;
                if(mensch.website != ""){
                  WebsiteElement= <div><a className={styles.website} href={mensch.website} target="_blank">{mensch.website} </a></div>
                }else{
                  WebsiteElement= <> </>
                }

              return(
                <>
                <div key={index} className={styles.menschwrapper}>
                  {/* Portrait Bild */}
                  <img 
                    className={styles.portrait}
                    src={mensch.portrait.url} 
                    alt={mensch.portrait.alt} 
                  />

                  <p className={styles.name}>
                    {mensch.name}
                  </p>

                  <div className={styles.links}>
                      {EmailElement}
                      {WebsiteElement}
                  </div>
                  <div className={styles.lebenslauf}>
                    <StructuredText data={mensch.lebenslauf.value} />
                  </div>
                  <div className={styles.projektliste}>
                      {/* Projektliste <br></br> */}
                      {mensch.projekte.map((projekt, index) => {
                          console.log("liste", projekt)
                        return (
                          <div key={index} className={styles.projekt}> 
                            <a href={projekt.slug}>
                              {projekt.titel}
                            </a>
                          </div>
                        )
                      })}
                  </div>
                  {/* Publikaitonsliste, falls vorhanden */}
                  {PDFElement}

                </div>




                </>
              )
            })}
            
            
            
            
           
      </Layout>
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

 

