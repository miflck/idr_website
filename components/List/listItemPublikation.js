import styles from './list.module.scss'
import Link from 'next/link'

const ListItemPublikation =(publikation)=>{
    //  console.log("ListItem publikaion", publikation)

    // filtern hier nach publikationsart, publikationsart hat auch eine id

    let href=`/publikationen` 
    if(publikation.slug!=""){
        href+=`/${publikation.slug}`
    }
 
    return(
        <div className={styles.projektwrapper} key={publikation.id}>
            <div className={styles.projektcontent}>

            {/* Publikationtitel */}
            <Link href={href}>
                <a>
                    <div className={styles.titel}>
                        {publikation.titel}
                    </div>
                </a>
            </Link>
            <img 
                className={styles.image}
                src={publikation.bild.url} 
                alt={publikation.bild.alt} 
            />
            </div>
        </div>
    )
}

 export default ListItemPublikation;