import styles from './list.module.scss'


const ListWrapper =(props)=>{
    const {children}=props || []
//  console.log("projektprops Listwrapper", props)
    return(
    <div className={styles.projektlistwrapper}>
        {children}
    </div>
    )
}

 export default ListWrapper;