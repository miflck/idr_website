import styles from './footer.module.scss'

const Footer=(props)=>{
    console.log("Footer",props)
    // const {children}=props || {}

    return(
        < div className={styles.footerwrapper}>
        <a href="https://hkb-idr.ch/#publikationen">
            Link zu irgendwas
        </a>
        </div>
    )
}

export default Footer;



