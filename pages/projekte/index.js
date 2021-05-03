// projektliste als übersicht
// dann single view von den projekten, unterseiten als [] setzen
import { request, PROJEKTE } from "../../lib/datocms";

import Layout from '../../components/Layout/layout'
import ListWrapper from '../../components/List/listWrapper'
import ListItemProjekt from '../../components/List/listItemProjekt'


export default function Projekte(props, index) {
  const {projekte:{allProjekts}}=props;

  return (
      <Layout>
          <ListWrapper>
                {allProjekts.map((projekt, index) => {
                  return(
                    <ListItemProjekt {...projekt} key={index}/>
                  )})
                      }
            </ListWrapper>
      </Layout>
  )
}

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps() {
  const projekte = await request({
      query: PROJEKTE,
    });

  return {
    props: {
      projekte,   
    }, // will be passed to the page component as props
  }
}

// export async function getStaticPaths() {
// }