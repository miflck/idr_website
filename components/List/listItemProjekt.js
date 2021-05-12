import styles from './list.module.scss'
import Link from 'next/link'


const ListItemProjekt =(props)=>{
   //  console.log("ListItem prpüs", props)
    //  const {projekt} = props;

const CategoryDivs = []

// for (var i=0;i<7;i++) {
//     CategoryDivs.push(
//     <div className={styles.categorydiv} key={i}>
//         {/* {props.forschungsfeld} */}hi
//     </div>
//     )
// }
for (var i=0;i<7;i++) {
    CategoryDivs.push(
    <>
        {props.forschungsfeld.map((forschungsfeld) => {
            // if (forschungsfeld.titel = "Social Communication") {
            return (
                <div className={styles.categorydiv} key={forschungsfeld.id}> 
                    {forschungsfeld.titel}
                </div>
                )
            // }
           
        })}
    </>
    )
}

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
                <div className={styles.forschungsfeldwrapper}>
                    {props.forschungsfeld.map((forschungsfeld) => {
                        return (
                            <a 
                            // onClick={() => props.setFilter(forschungsfeld.titel)} 
                            onClick={() => props.addMoreItem(forschungsfeld.titel)}
                            className={styles.forschungsfeld} key={forschungsfeld.id}> {forschungsfeld.titel} </a>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}

 export default ListItemProjekt;