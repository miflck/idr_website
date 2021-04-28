import Head from 'next/head'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IDR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <h2>HKB — Institute of Design Research</h2>
        
      </main>

      {/* <footer className={styles.footer}>
        
      </footer> */}
    </div>
  )
}
