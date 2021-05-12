import styles from './list.module.scss'
import Link from 'next/link'


const ListItemProjekt =(props)=>{
    // const {forschungsfelderliste:{forschungsfelderliste}}=props;
    // console.log("ListItem props", props)
    //  const {projekt} = props;

// alte idee 
// array mit keys and values machen, forschungsfeld, alle forschungsfelder holen, durch die loopen
//durch alle 7 forschungsfelder loopen, array mit 7 divs, key ist forschungsfeld, value ist <div>...</>
// arrays mit keys and values nachschauen
// dann arrayitem mit key forschungsfeld.titel, nicht nur mit value füllen sondern key mitgeben


const CategoryDivs = []
const AlleForschungsfelder = props.hidePainHarold.map((forschungsfeld) => { 
        console.log("alle Forschungsfelder in array forschungsfeld", forschungsfeld)
        // return (
        //     <div className={styles.categorydiv} key={forschungsfeld.titel}>
        //         {forschungsfeld}
        //     </div>  
        // )
    })


// es kennt forschungsfeld nur da drin 
console.log("alle Forschungsfelder", AlleForschungsfelder)

// davor rausfinden, welche zwei forschungsfelder aktuell sind
// nicht druch 7 loopen sondern durch alle forschungsfelder
for (var i=0;i<6;i++) {
    //bist du im aktuellen Forschungsfeld array? is in array wenn ja, class dazu mitgeben, wenn nein normales machen
    //mit wie state open oder so
    CategoryDivs.push(
    <div className={styles.categorydiv} key={i}>
        <div className={styles.categorylinie}></div>
    </div>
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