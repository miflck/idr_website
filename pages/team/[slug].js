import Layout from "../../components/Layout/layout"
import { request, MENSCHEINZEL } from "../../lib/datocms";
import { StructuredText } from "react-datocms";
import styles from '../slug.module.scss'


export default function Menscheinzelansicht (props) {
// console.log("props", props)
// falls params oder slug nicht ankommen, zu leeren strings ändern mit zeile 9
  const {data:{menschen:{
    name,
    slug,
    funktion,
    portrait,
    lebenslauf,
    email,
    website,
    projekte,
    publikationsliste
    }=""}=""}=props || ""

  

    // console.log("projektinhalte", props)

    if(props.data) {

                let PDFElement;
                if(publikationsliste != null && publikationsliste.url != null){
                    PDFElement= <div className={styles.pdf}>
                                    <a href={publikationsliste.url}>Publikationsliste</a>
                                    </div> 
                }else{
                    PDFElement= <> </>
                }
                let EmailElement;
                if(email != ""){
                  EmailElement= <div><a className={styles.email} href={`mailto:,${email}`}> {email} </a></div>
                }else{
                  EmailElement= <> </>
                }
                let WebsiteElement;
                if(website != ""){
                  WebsiteElement= <div><a className={styles.website} href={website} target="_blank">{website}</a></div>
                }else{
                  WebsiteElement= <> </>
                }
    
      return (
    <Layout>
          <div className={styles.einzelwrapper}>
            <div className={styles.titel}>
              {name}
            </div>

            {/* Portrait Bild */}
            <img 
              className={styles.portrait}
              src={portrait.url} 
              alt={portrait.alt} 
             />
          
            <div className={styles.links}>
                {EmailElement}
                {WebsiteElement}
            </div>
          
            <div>
              <StructuredText data={lebenslauf.value} />
            </div>

              <div className={styles.projektliste}>
                  {/* Projektliste <br></br> */}
                  {projekte.map((projekt, index) => {
                    // console.log("liste", projekt)
                    let href=`/projekte`
                    if(projekt.slug!=""){
                        href+=`/${projekt.slug}`
                    }
                    return (
                      <div key={index} className={styles.projekt}> 
                          <a href={href}>
                            {projekt.titel}
                          </a>
                      </div>
                    )
                  })}
              </div>

           {/* Publikaitonsliste, falls vorhanden */}
           {PDFElement}
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
        query: MENSCHEINZEL,variables: { slug:params.slug, locale:locale},
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
