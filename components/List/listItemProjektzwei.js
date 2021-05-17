import styles from './list.module.scss'
import Link from 'next/link'


const ListItemProjekt =(props)=>{
const CategoryDivs = []

const alleForschungsfelderDivs = props.allForschungsfelder.map((forschungsfeld) => { 
        //console.log("alle Forschungsfelder in array forschungsfeld", forschungsfeld,forschungsfeld.titel,props.forschungsfeld.includes(forschungsfeld.titel))
        const found = props.forschungsfeld.filter(x => {
            return(x.titel === forschungsfeld.titel)
        });
       
         return (
            CategoryDivs.push(
                <div className={[styles.categorydiv, (found.length>0 ? styles.fill : [])].join(' ')} key={forschungsfeld.titel}>
                    {/* <div className={styles.categorylinie}></div> */}
                    {/* <a onClick={() => props.addMoreItem(forschungsfeld.titel)} className={[styles.forschungsfeld, (found.length>0 ? styles.colored : [])].join(' ')}>{forschungsfeld.titel}</a> */}
                </div>  
            )
         )
    })


     const enddatum = new Date(props.enddatum).toLocaleString([], {
                month: 'long', 
                year: 'numeric'
                }); 
      
        let href=`/projekte`
        if(props.slug!=""){
            href+=`/${props.slug}`
        }

    return(
        <div className={styles.projektwrapper} key={props.id}>
            
            <div className={styles.categorydivwrapper}>
                {CategoryDivs}
            </div>

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
                {/* <div className={styles.forschungsfeldwrapper}>
                    {props.forschungsfeld.map((forschungsfeld) => {
                        return (
                            <a
                            onClick={() => props.addMoreItem(forschungsfeld.titel)
                                // , () => props.handleAktivForschungsfeld()
                            }
                            className={styles.forschungsfeld} key={forschungsfeld.id}> {forschungsfeld.titel} </a>
                        )
                    })}
                </div> */}
                
            </div>
        </div>
    )
}

 export default ListItemProjekt;