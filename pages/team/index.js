import { request,MENSCHEN } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from './team.module.scss'
import Layout from '../../components/Layout/layout'

const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
    console.log("menschen",props);

       return(
      <Layout>
          <div className={styles.teamcontainer}>
            {allMenschens.map((mensch, index) => {


              // sort by anleitung react 
              // https://ramonak.io/posts/react-how-to-sort-array-of-objects-with-dropdown-and-hooks/




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
              
              // if(mensch.funktion.titel="ForscherInnen") {

                    let href=`/team`
                    if(mensch.slug!=""){
                        href+=`/${mensch.slug}`
                    }

                    return(
                      <div key={index} className={styles.menschwrapper}>
                          {/* Portrait Bild */}
                          <img 
                            className={styles.portrait}
                            src={mensch.portrait.url} 
                            alt={mensch.portrait.alt} 
                          />
                          <div className={styles.name}>
                            <a href={href}>
                              {mensch.name}
                            </a>
                          </div>
                      </div>
                    )
            // }
            })}
          </div>
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

 

