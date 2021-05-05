// import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import NavMenu from '../components/Menu/navMenu'
import Layout from '../components/Layout/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'



export default function Home(props) {
  console.log(props)
  const { t } = useTranslation('common')
  return (
    <Layout>
      <main className={styles.container}>
          Startpage <br />
          {t('Test')}
       
      </main>
    </Layout>
  )
}


export async function getStaticProps({locale}) {
  console.log("..",locale)
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}
