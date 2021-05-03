import styles from './footer.module.scss'

const Footer=(props)=>{
    console.log("Footer",props)
    // const {children}=props || {}

    return(
        < div className={styles.footerwrapper}>
            <a href="https://hkb-idr.ch/#publikationen">Footer Link</a>
            {/* Farbe wechseln als Extra, noch einbauen  */}
            {/* <div onClick={} className={styles.buttonMaincolor}/>
            <div className={styles.buttonSecondcolor}/> */}
        </div>
    )
}

export default Footer;



