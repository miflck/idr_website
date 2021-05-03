import { request,VERANSTALTUNGEN } from "../lib/datocms"
import { StructuredText } from "react-datocms"
import styles from './veranstaltungen.module.scss'
import Layout from '../components/Layout/layout'


const Veranstaltungen =(props)=>{
  const {veranstaltungen:{allVeranstaltungs}}=props;
    // console.log("props",props);
    return(
      <Layout>
        <div className={styles.veranstaltungswrapper} >
            {allVeranstaltungs.map((veranstaltung, index) => {
                const datum = new Date(veranstaltung.datum).toLocaleString([], {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: '2-digit', minute: '2-digit'});
                    return(
                       <div className={styles.veranstaltungscontent} key={index}>
                            <p className={styles.title}>{veranstaltung.titel}</p>
                            <p className={styles.referentIn}>{veranstaltung.referentIn}</p>
                            <div className={styles.zentriert}>
                              <p className={styles.datum}>{datum} Uhr</p>
                              <p className={styles.untertitel}>{veranstaltung.untertitel}</p>
                              <p className={styles.organisation}>{veranstaltung.organisation}</p>
                            </div>
                            <p className={styles.beschreibung}>
                              <StructuredText data={veranstaltung.beschreibung.value}/>
                            </p>
                       </div>
                    )
            })}
        </div>
      </Layout>
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

 

