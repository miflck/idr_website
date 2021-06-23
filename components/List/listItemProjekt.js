import React, {useEffect, useContext } from 'react';
import { AppContext, ACTIONS } from '../../context/state';


import styles from './list.module.scss'
import Link from 'next/link'
import Container from '../../components/Container/container'

const ListItemProjekt =(props)=>{
    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState



     const enddatum = new Date(props.enddatum).toLocaleString([], {
                year: 'numeric'
                });
    const startdatum = new Date(props.startdatum).toLocaleString([], {
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
                    // let colour_stylehover;
                    // console.log("Farben",forschungsfeld.colour.hex)
                    if(props.filter.includes(forschungsfeld.titel)) {
                      btn_class = styles.forschungsfeldaktiv
                    //   colour_style={
                    //     backgroundColor: forschungsfeld.colour.hex,
                    //   }
                    //   const root = document.documentElement;
                    //  root?.style.setProperty('--maincolor', `${forschungsfeld.colour.hex}`);
                    }
                    else {
                      btn_class = styles.forschungsfeld
                    //   colour_style= {
                    //     color: 'var(--maincolor)',
                    //   }
                    //   colour_stylehover = {
                    //       color: 'var(--secondcolor'),
                    //   }
                    }
                    return (
                        <span className={btn_class} >
                            <a 
                            // style={colour_style}
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

        let background_style={
        };

        let colors=[];


        props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
        })
        

        if(state.showGradient){
            background_style={
                background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
              }
        }

          let background_style_small={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`
          }

    return (
            <div className={styles.wrapper} key={props.id} >
                <Container>
                    <div className={styles.content} style={background_style}>
                        <div className={styles.datum}>{startdatum} – {enddatum}</div>
                        <Link href={href}>
                            <div className={styles.titel}>
                                <a>{props.titel}  </a>  
                            </div>
                        </Link>
                        {ForschungsfeldElement}
                    </div>
                </Container>
            </div>
    )
}

 export default ListItemProjekt;