import NavMenu from '../Menu/navMenu'
import styles from './header.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'


const Header=(props)=>{
    const router = useRouter()
    // console.log("router", router)
    if(router.pathname === "/") {
        var seitentitel = "NEWS";
        // console.log("Seite", seite)
    } else if (router.pathname === "/editorial"){
        var seite = router.pathname.split('/');
        var seitentitel = seite[1]
    } else {
        // var seite = router.asPath.split('/').join('— ');
        var seite = router.pathname.split('/');
        var seitentitel = seite[1]
        // console.log("seite", seite[1])
    }
    
    return (
        <div className={styles.headercontainer}>
            <Head>
            <title>IDR</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; vitals.vercel-insights.com;"></meta>
            </Head>
            <link rel="icon" href="../favicon.ico"/>
            <div className={styles.headertitle}><Link href="/">HKB — Institute of Design Research</Link> <span className={styles.seitentitel}> — {seitentitel}</span></div>
            <NavMenu/>
        </div>
    )
}

export default Header;



