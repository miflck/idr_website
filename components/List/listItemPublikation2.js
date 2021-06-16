import styles from './listpublikationen.module.scss'
import Link from 'next/link'
import Container from '../Container/container'

const ListItemPublikation2 =(publikation)=>{
    console.log("Publikation ",publikation.title[0].text)
    let href=`/publikationen` 
    if(publikation.slug!=""){
        href+=`/${publikation.slug}`
    }
    return(
        <Link href={href}>
            <div className={styles.projektwrapper} key={publikation.id}>
            <Container>
                <div className={styles.titel}>
                    <a>{publikation.title[0].text}</a>

                </div>

         
                </Container>
            </div>
        </Link>
    )
}

 export default ListItemPublikation2;