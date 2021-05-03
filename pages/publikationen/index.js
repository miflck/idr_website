// publikationen als übersicht
// dann single view von den projekten, unterseiten als [] setzen
import { request, PUBLIKATIONEN } from "../../lib/datocms";
// import styles from './projekte.module.scss'

import Layout from "../../components/Layout/layout"
import ListWrapper from '../../components/List/listWrapper'
import ListItemPublikation from "../../components/List/listItemPublikation";


export default function Publikationen(props, index) {
  const {publikationen:{allPublikationens}}=props;

  return (
      <Layout>
          <ListWrapper>
                {allPublikationens.map((publikation, index) => {
                  return(
                    <ListItemPublikation {...publikation} key={index}/>
                  )})
                      }
            </ListWrapper>
      </Layout>
  )
}

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
  const publikationen = await request({
      query: PUBLIKATIONEN,
    });

  return {
    props: {
      publikationen,   
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths() {
// }