import styles from './listpublikationen.module.scss'
import Link from 'next/link'
import Container from '../Container/container'

const ListItemPublikation =(publikation)=>{
    let href=`/publikationen` 
    if(publikation.slug!=""){
        href+=`/${publikation.slug}`
    }
    return(
        <Link href={href}>
            <div className={styles.projektwrapper} key={publikation.id}>
            <Container>
                <div className={styles.titel}>
                    <a>{publikation.titel}</a>
                </div>

                <img 
                    className={styles.image}
                    src={publikation.bild.url} 
                    alt={publikation.bild.alt} 
                />
                </Container>
            </div>
        </Link>
    )
}

 export default ListItemPublikation;