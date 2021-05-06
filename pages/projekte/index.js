import { request, PROJEKTE } from "../../lib/datocms";
import Layout from '../../components/Layout/layout'
import ListWrapper from '../../components/List/listWrapper'
import ListItemProjekt from '../../components/List/listItemProjekt'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Projekte(props) {
  const {projekte:{allProjekts}}=props;
  const { t } = useTranslation('common')

  return (
      <Layout>
          <ListWrapper>
                {allProjekts.map((projekt) => {
                  return(
                    <ListItemProjekt {...projekt} key={projekt.id}/>
                  )})
                      }
            </ListWrapper>
      </Layout>
  )
}

// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
  const projekte = await request({
      query: PROJEKTE, variables: {locale:locale},
    });

  return {
    props: {
      projekte,   
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}


// export async function getStaticPaths() {
// }