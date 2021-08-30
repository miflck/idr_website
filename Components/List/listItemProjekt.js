import React, {useEffect, useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import styles from './list.module.scss'
import Link from 'next/link'
import Container from '../../Components/Container/container'
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement';

const ListItemProjekt =(props)=>{
    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState

    const [showHoverGradient,setHoverGradient]=useState();
	const handleShowGradient = (val) => { };

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


        let colors=[];
        props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
        })

        let background_style={
            background: `linear-gradient(to right,"white"})`,
            animation:`${styles.fadeOut} 0.5s ease`
        };

        let background_style_small={
            background: `linear-gradient(to right,"white"})`,
            animation:`${styles.fadeOut} 0.5s ease`,
        }; 

        if(state.showGradient || showHoverGradient){
            background_style={
                background: `linear-gradient(to right, white,${colors[0]}, ${colors[1] || "white"},white)`,
                opacity:1,
                animation:` ${styles.fadeIn} 0.5s ease`
              }
   
         background_style_small={
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
            opacity:1,
            animation:`${styles.fadeIn} 0.5s ease`
          }
        }


    return (
            <div className={styles.wrapper} key={props.id} onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}>
                <div className={styles.backgroundwrapper} style={background_style_small}></div>
                <Container>
                    <div className={styles.content}>
                        <div className={styles.datum}>{startdatum} – {enddatum}</div>
                        <Link href={href}  as={href}>
                            <div className={styles.titel}>
                                {props.titel}
                            </div>
                        </Link>

                        <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient}/>
                    </div>
                </Container>
            </div>
    )
}

 export default ListItemProjekt;