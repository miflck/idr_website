import styles from '../styles/Home.module.scss'
import Layout from '../components/Layout/layout'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home(props) {
  // console.log(props)
  const { t } = useTranslation('common')
  return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
      <main className={styles.container}>
          Startpage <br></br>
          {t('Test')}
       
      </main>
    </Layout>
  )
}


export async function getStaticProps({locale}) {
  // console.log("..",locale)
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    }, // will be passed to the page component as props
  }
}