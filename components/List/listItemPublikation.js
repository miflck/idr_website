import styles from './list.module.scss'
import { StructuredText } from "react-datocms";


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
            <a href={href}>
                    <div className={styles.titel}>
                        {publikation.titel}
                    </div>
                </a>
            <img 
                className={styles.image}
                src={publikation.bild.url} 
                alt={publikation.bild.alt} 
            />


            {/* <StructuredText data={publikation.link.value} /> */}


            {/* <div>Mitarbeit</div>
                {publikation.mitarbeit != null &&
                publikation.mitarbeit.map((mitarbeiterin, index) => {
                  return (
                    <a key={index} href={mitarbeiterin.slug}>{mitarbeiterin.name}<br></br></a>
                  )
                })} */}
                </div>
        </div>
    )
}

 export default ListItemPublikation;