import React, {useEffect, useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import styles from '../../pages/team/team.module.scss'
import Link from 'next/link'
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement';

const ListItemTeam =(props)=>{
    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState

    const [showHoverGradient,setHoverGradient]=useState();
	const handleShowGradient = (val) => { };
                
        let href=`/team`
        if(props.slug!=""){
            href+=`/${props.slug}`
        }

        let colors=[];
        props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
        })

        let background_style_small={
            background: `linear-gradient(to right,"white"})`,
            animation:`${styles.fadeOut} 0.5s ease`,
        }; 

        if(state.showGradient || showHoverGradient || props.filter.length > 0){
         background_style_small={
            background: `linear-gradient(to right, ${colors[1]}, ${colors[0] || "white"})`,
            opacity:1,
            animation:`${styles.fadeIn} 0.5s ease`
          }
        } else {
            background_style_small={
                background: 'white'
            }
        }


    return (
        <div key={props.name} className={styles.menschwrapper} 
          style={background_style_small}  
          onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}
        >
          <Link href={href}>
            <span>
              <img 
                className={styles.portrait}
                src={props.portrait.url} 
                alt={props.portrait.alt} 
              />
              <div className={styles.name}>
                  {props.name}
              </div>
            </span>
          </Link>
          <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient}/>
        </div>
    )
}

 export default ListItemTeam;