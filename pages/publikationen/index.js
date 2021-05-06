import { request, PUBLIKATIONEN } from "../../lib/datocms";
import Layout from "../../components/Layout/layout"
import ListWrapper from '../../components/List/listWrapper'
import ListItemPublikation from "../../components/List/listItemPublikation";

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


export default function Publikationen(props, index) {
  const {publikationen:{allPublikationens}}=props;
  const { t } = useTranslation('common')

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