import { request, PUBLIKATIONEN } from "../../lib/datocms";
import Layout from "../../components/Layout/layout"
import ListWrapper from '../../components/List/listWrapper'
import ListItemPublikation from "../../components/List/listItemPublikation";
import styles from './publikationen.module.scss'
import Container from "../../components/Container/container";

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Publikationen(props) {
  const {publikationen:{allPublikationens}}=props;
  console.log("allempublikationens",props);
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
  
  var groupedPublications = groupBy(allPublikationens, 'publikationsart','titel');
  for (const [key, value] of Object.entries(groupedPublications)) {
    value.map((publikation)=>{
    })}

  return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
          
          <div className={styles.funktionstitle}><Container>Buch</Container></div>
          <ListWrapper>
                  {groupedPublications.Buch.map((publikation) => {
                    return(
                      <ListItemPublikation {...publikation} key={publikation.id}/>
                    )})
                        }
          </ListWrapper>

          <div className={styles.funktionstitle}><Container>Forschungsbericht</Container></div>
          <ListWrapper>
                {groupedPublications.Forschungsbericht.map((publikation) => {
                  return(
                    <ListItemPublikation {...publikation} key={publikation.id}/>
                  )})
                      }
          </ListWrapper>

          <div className={styles.funktionstitle}><Container>Sonstige</Container></div>
          <ListWrapper>
                {groupedPublications.Sonstige.map((publikation) => {
                  return(
                    <ListItemPublikation {...publikation} key={publikation.id}/>
                  )})
                      }
          </ListWrapper>


      </Layout>
  )
}


export async function getStaticProps({locale}) {
  const publikationen = await request({
      query: PUBLIKATIONEN, variables: {locale:locale},
    });

      const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
      const publicationdata = await res.json()

  return {
    props: {
      publikationen, 
      publicationdata,  
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths() {
// }