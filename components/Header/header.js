import NavMenu from '../Menu/navMenu'
import styles from './header.module.scss'
import { useRouter } from 'next/router'

const Header=(props)=>{
    const router = useRouter()
    // console.log("router", router.pathname)
    if(router.asPath === "/") {
        var seite = "NEWS"
    } else if (router.pathname === "/editorial"){
        var seite = router.pathname.split('/');
    } else {
        // var seite = router.asPath.split('/').join('— ');
        var seite = router.asPath.split('/');
        seite = seite[1];
        console.log("seite", seite)
    }
    
    return (
        <div className={styles.headercontainer}>
        <title>IDR</title>
        <link rel="icon" href="../favicon.ico"/>
        <h2>HKB — Institute of Design Research <span className={styles.seitentitel}> — {seite}</span></h2>
        <NavMenu/>
        </div>
    )
}

export default Header;



