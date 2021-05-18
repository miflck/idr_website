import styles from './listdrei.module.scss'


const ListWrapper =(props)=>{
    const {children}=props || []
    return(
    <div className={styles.projektlistwrapper}>
        {children}
    </div>
    )
}

 export default ListWrapper;