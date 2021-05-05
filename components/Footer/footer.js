import styles from './footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Footer=(props)=>{
    // console.log("Footer",props)
    // const {children}=props || {}
    const router = useRouter()
    console.log("router",router)
    // useRouter zum rausfinden, wo man ist
    return(
        < div className={styles.footerwrapper}>
            <a href="https://hkb-idr.ch/#publikationen">Footer Link</a>
            
            <Link href={router.asPath} locale="de">
      		    <a>de</a>
    	    </Link>
            <Link href={router.asPath} locale="en">
      		    <a>en</a>
    	    </Link>

            {/* Farbe wechseln als Extra, noch einbauen  */}
            <a 
            // onClick={} 
            className={styles.buttons} id={styles.maincolor}>
                2
            </a>
            <a 
            // onClick={} 
            className={styles.buttons} id={styles.secondcolor}>
                2
            </a>

        </div>
    )
}

export default Footer;



