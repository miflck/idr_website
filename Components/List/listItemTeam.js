import React, {useEffect, useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import styles from './list.module.scss'
import Link from 'next/link'
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement';
import Tile from '../Tile/Tile';

const ListItemTeam =(props)=>{
    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState

    const [showHoverGradient,setHoverGradient]=useState();

    const handleHover = (isHover) => {
      if(isHover){
          dispatch({ type: ACTIONS.ADD_HOVER_FILTER, payload: { element: researchFieldIdArray} })
          setHoverGradient(true)
      }else{
          dispatch({ type: ACTIONS.REMOVE_HOVER_FILTER, payload: { element: researchFieldIdArray } })
          setHoverGradient(false)
      }
  };

	const handleShowGradient = (val) => { };
                
        let href=`/team`
        if(props.slug!=""){
            href+=`/${props.slug}`
        }

        let colors=[];
        props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
        })


   // get array of Ids of tags for handleHover
   const researchFieldIdArray = props.forschungsfeld.reduce((acc, it) => {
    acc.push(it.id);
    return acc;
  }, []);

              // get Array of colors from all tags
      const colorArray = props.forschungsfeld.reduce((acc, it) => {
        acc.push(it.colour.hex);
        return acc;
      }, []);
console.log("colorarray",colorArray,props.forschungsfeld)

      colorArray[0]="#000000"

           // factory for gradient background style 
           const getGradientBackgroundStyle=(gradient,anim,opac)=>{
            return {
              background: gradient,
              opacity:opac,
              animation:anim,
            }
        }
        const gradient_highlight=  `linear-gradient(to right, ${colorArray[0] }, ${colorArray[1] || "black"})`;

        const gradient_normal=`linear-gradient(to right,"black"})`;
        const animationOut=`${styles.fadeOut} .9s ease`;
        const animationIn=` ${styles.fadeIn} 0.5s ease`;

        let background_style=getGradientBackgroundStyle(gradient_highlight,animationOut,0)

        if(props.showGradient || showHoverGradient){
          background_style=getGradientBackgroundStyle(gradient_highlight,animationIn,1)
      }

        /*
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
*/

    return (
      <Tile>
      <div className={` ${styles.wrapper} ${showHoverGradient ? styles.highlight : ""}`} 
      key={props.id} 
          onMouseEnter={ ()=>handleHover(true)} 
          onTouchStart={ ()=>handleHover(true)}  
          onMouseLeave={ ()=>handleHover(false)}
          onTouchEnd={ ()=>handleHover(false)}
          onTouchCancel={ ()=>handleHover(false)}

          //onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}
        >

          <div className={styles.gradientContainertile} style={background_style}></div>
          <div className={`${styles.menschwrapper}`} >

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
          <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient}  secondColor="#000000"/>
          </div>

        </div>

        </Tile>
    )
}

 export default ListItemTeam;