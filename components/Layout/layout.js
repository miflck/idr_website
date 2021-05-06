import styles from './layout.module.scss'
import NavMenu from '../Menu/navMenu'
import Header from '../Header/header'
import Footer from '../Footer/footer'



const Layout=(props)=>{
    // console.log("Layout ",props)
    const {children}=props || {}

    return(
        <div className={styles.layoutContainer}>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout;



