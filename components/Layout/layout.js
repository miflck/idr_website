import styles from './layout.module.scss'

const Layout=(props)=>{
console.log("Layout ",props)
const {children}=props || {}

return(
    <div className={styles.layoutContainer}> 
        {children}
    </div>
)


}

export default Layout;



