import styles from './list.module.scss'


const ListItemProjekt =(projekt, index)=>{
    //  console.log("ListItem prpüs", projekt)
     const enddatum = new Date(projekt.enddatum).toLocaleString([], {
                month: 'long', 
                year: 'numeric'
                });

                
        let href=`/projekte`
        if(projekt.slug!=""){
            href=`${projekt.slug}`
        }
    return(
        <div className={styles.projektwrapper} key={index}>
            <div className={styles.projektcontent}>
                {/* Projekt Enddatum */}
                <div className={styles.datum}>{enddatum}</div>
                            
                {/* Projekttitel */}
                <a 
                href={href}
                // href={`/projekte/${projekt.slug}`}
                >
                    <div className={styles.titel}>
                        {projekt.titel}
                    </div>
                </a>

                {/* Porjekt Forschungsfelder tags */}
                <div className={styles.forschungsfeldwrapper}>
                    {projekt.forschungsfeld.map((forschungsfeld, index) => {
                        return (
                            <span className={styles.forschungsfeld} key={index}> {forschungsfeld.titel} </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

 export default ListItemProjekt;