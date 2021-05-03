import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import NavMenu from '../components/Menu/navMenu'
import Layout from '../components/Layout/layout'

export default function Home() {
  return (
    <Layout>
      <main className={styles.container}>
          Startpage
          {/* <main className={styles.main}>
          </main> */}
      </main>
    </Layout>
  )
}
