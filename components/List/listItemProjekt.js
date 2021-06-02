import styles from './list.module.scss'
import Link from 'next/link'


const ListItemProjekt =(props)=>{

    console.log("dkd--------", props)

     const enddatum = new Date(props.enddatum).toLocaleString([], {
                month: 'long', 
                year: 'numeric'
                });
                
        let href=`/projekte`
        if(props.slug!=""){
            href+=`/${props.slug}`
        }

        let ForschungsfeldElement;
        if(props.filter) {
            ForschungsfeldElement = <div className={styles.forschungsfeldwrapper}>
                {props.forschungsfeld.map((forschungsfeld) => {
                    let btn_class;
                    if(props.filter.includes(forschungsfeld.titel)) {
                      btn_class = styles.forschungsfeldaktiv
                    }
                    else {
                      btn_class = styles.forschungsfeld
                    }
                    return (
                        <span className={btn_class}>
                            <a
                            onClick={() => props.addMoreItem(forschungsfeld.titel)}
                            key={forschungsfeld.id}
                            > 
                              {forschungsfeld.titel} 
                            </a>
                        </span>
                    )
                })}
            </div>
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

                {ForschungsfeldElement}
                
            </div>
        </div>
        </div>
    )
}

 export default ListItemProjekt;