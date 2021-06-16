import styles from './list.module.scss'
import Link from 'next/link'
import Container from '../../components/Container/container'

const ListItemProjekt =(props)=>{

     const enddatum = new Date(props.enddatum).toLocaleString([], {
                // month: 'long', 
                year: 'numeric'
                });
    const startdatum = new Date(props.startdatum).toLocaleString([], {
                // month: 'long', 
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
                    let colour_style;

                    console.log("Farben",forschungsfeld.colour.hex)
                    
                    if(props.filter.includes(forschungsfeld.titel)) {
                      btn_class = styles.forschungsfeldaktiv
                      colour_style={
                        backgroundColor: forschungsfeld.colour.hex,
                      }
                   //   const root = document.documentElement;
                    //  root?.style.setProperty('--maincolor', `${forschungsfeld.colour.hex}`);
                    }
                    else {
                      btn_class = styles.forschungsfeld
                      colour_style={
                        color: 'black',
                      }
                    }
                    return (
                        <span className={btn_class} >
                            <a style={colour_style}
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

    return (
            <div className={styles.projektwrapper} key={props.id}>
                <Container>
                    <div className={styles.projektcontent}>
                        {/* Projekt Enddatum */}
                        <div className={styles.datum}>{startdatum} – {enddatum}</div>
                        <Link href={href} activeClassName={styles.activelink}>
                            <a>
                                <div className={styles.titel}>
                                    {props.titel}
                                </div>
                            </a>          
                        </Link>
                        {ForschungsfeldElement}
                    </div>
                </Container>
            </div>
    )
}

 export default ListItemProjekt;