import { request,MENSCHEN } from "../../lib/datocms";
// import { StructuredText } from "react-datocms";
import styles from './team.module.scss'
import Layout from '../../components/Layout/layout'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


const Team =(props)=>{
  const {menschen:{allMenschens}}=props;
    const { t } = useTranslation('common')
    
function groupBy(objectArray, property, key) {
  return objectArray.reduce(function (acc, obj) {
    var innerObject = obj[property];
    if(!acc[innerObject[key]]) {
      acc[innerObject[key]] = [];
    }
    acc[innerObject[key]].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(allMenschens, 'funktion','titel');
for (const [key, value] of Object.entries(groupedPeople)) {
  //console.log("key",key);
  value.map((mensch)=>{
    //console.log(mensch)
  })}

       return(
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
          <div className={styles.teamcontainer}>

            <div className={styles.funktionstitle}>Leitung und Büro</div>
            {groupedPeople.Leitung_und_Buero.map((mensch) => {
                    let href=`/team`
                    if(mensch.slug!=""){
                        href+=`/${mensch.slug}`
                    }
                    return(
                      <Link href={href}>
                      <div key={mensch.id} className={styles.menschwrapper}>
                           {/* Portrait Bild  */}
                          <img 
                            className={styles.portrait}
                            src={mensch.portrait.url} 
                            alt={mensch.portrait.alt} 
                          />
                          <div className={styles.name}>
                              <a>{mensch.name}</a>
                          </div>
                      </div>
                      </Link>
                    )})}

            <div className={styles.funktionstitle}>Forscher*innen</div>
            {groupedPeople.ForscherInnen.map((mensch) => {
              let href=`/team`
              if(mensch.slug!=""){
              href+=`/${mensch.slug}`
              }
            return(
              <Link href={href}>
              <div key={mensch.id} className={styles.menschwrapper}>
                {/* Portrait Bild  */}
                <img 
                className={styles.portrait}
                src={mensch.portrait.url} 
                alt={mensch.portrait.alt} 
                />
                <div className={styles.name}>
                    <a>{mensch.name}</a>
                </div>
              </div>
              </Link>
            )
            })}
          </div>
      </Layout>
    )
}

 export default Team;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
    const menschen = await request({
        query: MENSCHEN,  variables: {locale:locale},
      });

    return {
      props: {
        menschen,   
        ...await serverSideTranslations(locale, ['common']),
      }, // will be passed to the page component as props
    }
  }

 

