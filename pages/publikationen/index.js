import { request, PUBLIKATIONEN } from "../../lib/datocms";
import Layout from "../../components/Layout/layout"
import ListWrapper from '../../components/List/listWrapper'
import ListItemPublikation from "../../components/List/listItemPublikation";
import styles from './publikationen.module.scss'

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
          
          <div className={styles.funktionstitle}>Buch</div>
          <ListWrapper>
                  {groupedPublications.Buch.map((publikation) => {
                    return(
                      <ListItemPublikation {...publikation} key={publikation.id}/>
                    )})
                        }
          </ListWrapper>

          <div className={styles.funktionstitle}>Forschungsbericht</div>
          <ListWrapper>
                {groupedPublications.Forschungsbericht.map((publikation) => {
                  return(
                    <ListItemPublikation {...publikation} key={publikation.id}/>
                  )})
                      }
          </ListWrapper>

          <div className={styles.funktionstitle}>Sonstige</div>
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

  return {
    props: {
      publikationen,   
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths() {
// }