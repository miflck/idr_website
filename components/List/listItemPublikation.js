import styles from './list.module.scss'
import Link from 'next/link'

const ListItemPublikation =(publikation, index)=>{
    //  console.log("ListItem publikaion", publikation)

    // filtern hier

    let href=`/publikationen`
    if(publikation.slug!=""){
        href+=`/${publikation.slug}`
    }
 
    return(
        <div className={styles.projektwrapper} key={index}>
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