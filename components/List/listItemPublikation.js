import styles from './listpublikationen.module.scss'
import Link from 'next/link'

const ListItemPublikation =(publikation)=>{
    let href=`/publikationen` 
    if(publikation.slug!=""){
        href+=`/${publikation.slug}`
    }
    return(
        <Link href={href}>
            <div className={styles.projektwrapper} key={publikation.id}>
                <div className={styles.titel}>
                    <a>{publikation.titel}</a>
                </div>

                <img 
                    className={styles.image}
                    src={publikation.bild.url} 
                    alt={publikation.bild.alt} 
                />
            </div>
        </Link>
    )
}

 export default ListItemPublikation;