import styles from './list.module.scss'
import Link from 'next/link'


const ListItemProjekt =(props)=>{

     const enddatum = new Date(props.enddatum).toLocaleString([], {
                month: 'long', 
                year: 'numeric'
                });
                
        let href=`/projekte`
        if(props.slug!=""){
            href+=`/${props.slug}`
        }

    return(
        <div className={styles.projektlistwrapper}>
            <div className={styles.projektwrapper} key={props.id}>

            <div className={styles.projektcontent}>
                {/* Projekt Enddatum */}
                <div className={styles.datum}>{enddatum}</div>
                            
                <Link href={href} activeClassName={styles.activelink}>
                  <a>
                    <div className={styles.titel}>
                        {props.titel}
                    </div>
                </a>          
                </Link>

                {/* Porjekt Forschungsfelder tags */}
                <div className={styles.forschungsfeldwrapper}>
                    {props.forschungsfeld.map((forschungsfeld) => {
                        return (
                            <a
                            onClick={() => props.addMoreItem(forschungsfeld.titel)}
                            className={styles.forschungsfeld} key={forschungsfeld.id}> {forschungsfeld.titel} </a>
                        )
                    })}
                </div>
                
            </div>
        </div>
        </div>
    )
}

 export default ListItemProjekt;