import React, { useEffect, useContext, useState } from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import styles from './list.module.scss'
import Link from 'next/link'

import Tile from '../Tile/Tile';
import { GradientContainer } from '..';
import { getColorArray, getGradientBackgroundStyle,makeGradient } from '../../lib';
import { makeGradientFromArray } from '../../lib/helpers';
import { ElementTitle } from '../Composition';

import { ImageElement } from '../Composition';

// import Container from '../../Components/Container/container'
import TextElement from '../Composition/TextElement';
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement';

const ListItemNews = (props) => {
    const {id,title,forschungsfelder,image,text,link}=props;

    const globalState = useContext(AppContext);
    const { state } = globalState
    const { dispatch } = globalState

    const [showHoverGradient, setHoverGradient] = useState();
    const handleShowGradient = (val) => { };


let hrefInternalLink="";

    if(link){
    if (link._modelApiKey === 'projekt') {
        hrefInternalLink += `/projekte/${link.slug}`
    }}
   /* let hrefveranstaltungen = `/veranstaltungen`
    if (props._modelApiKey === 'veranstaltung') {
        hrefveranstaltungen += `/${props.slug}`
    }
*/
    const date = new Date(props.datum).toLocaleString([], {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    


    const handleHover = (isHover) => {
        if(isHover){
            dispatch({ type: ACTIONS.ADD_HOVER_FILTER, payload: { element: researchFieldIdArray} })
            setHoverGradient(true)
        }else{
            dispatch({ type: ACTIONS.REMOVE_HOVER_FILTER, payload: { element: researchFieldIdArray } })
            setHoverGradient(false)
        }
    };
  


 // get array of Ids of tags for handleHover
 const researchFieldIdArray = forschungsfelder.reduce((acc, it) => {
    acc.push(it.id);
    return acc;
  }, []);

   // get Array of colors from all tags
   const colorArray=getColorArray(forschungsfelder);
   //  const gradient_highlight=makeGradient(colorArray[0],colorArray[1],"to left");
   if(colorArray.length<1){
    colorArray[0]="#000000";
   }
   //colorArray[1]="#FF0000";
    if(colorArray.length<2){
     colorArray[1]=colorArray[0];//"#000000";
    }

    const gradient_highlight=makeGradientFromArray(colorArray,"to right");
    const animationOut=`${styles.fadeOut} .9s ease`;
    const animationIn=` ${styles.fadeIn} 0.5s ease`;

    let background_style=getGradientBackgroundStyle(gradient_highlight,animationOut,0)
    if(props.showGradient || showHoverGradient){
        background_style=getGradientBackgroundStyle(gradient_highlight,animationIn,1)
    }



    const gradient_image=makeGradient(colorArray[0]+"80","rgba(255,255,255,0)","to bottom");
    let background_style_image=getGradientBackgroundStyle(gradient_image,animationOut,0)
    if(props.showGradient || showHoverGradient){
        background_style_image=getGradientBackgroundStyle(gradient_image,animationIn,1)
     // background_style_test["mix-blend-mode"]="multiply"

    }

/*
    let colors = [];
    props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
    });

    let background_style_small = {
        background: `linear-gradient(to right,"white"})`,
        animation: `${styles.fadeOut} 0.5s ease`,
    };

    if (state.showGradient || showHoverGradient || props.filter.length > 0) {
        if(colors.length > 0) {
            background_style_small = {
                background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
                opacity: 1,
                animation: `${styles.fadeIn} 0.5s ease`
            }
        } else {
            background_style_small = {
                background: 'black'
            }
        }
    } else {
        background_style_small={
            background: 'white'
        }
    }
*/
    
    return (
        <>

        <div className={` ${styles.wrapper} ${showHoverGradient ? styles.highlight : ""}`} 
        key={props.id} 
          onMouseEnter={ ()=>handleHover(true)} 
          onTouchStart={ ()=>handleHover(true)}  
          onMouseLeave={ ()=>handleHover(false)}
          onTouchEnd={ ()=>handleHover(false)}
          onTouchCancel={ ()=>handleHover(false)}

          //onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}
        >
        <GradientContainer backgroundStyle={background_style}> 
        <div className={`${styles.menschwrapper}`} >

            {image && 
            <div className={styles.portraitWrapper}>
              <GradientContainer backgroundStyle={background_style_image}>
              <ImageElement src={image.url}  alt={image.alt} ></ImageElement>
              </GradientContainer>
              </div> 
             }
            <ElementTitle highlight={showHoverGradient}>
                  {title}           
              </ElementTitle>
              <TextElement key={text.id} {...text}></TextElement>
                {link &&
                    <Link href={hrefInternalLink}>{link.titel}</Link>
                }
           
            <ForschungsfeldElement  forschungsfeld={forschungsfelder} showHoverGradient={showHoverGradient}/>    
    
            </div>
            </GradientContainer>
        </div>
        </>
    )
}

export default ListItemNews;