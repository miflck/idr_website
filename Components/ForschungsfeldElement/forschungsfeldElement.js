import styles from './forschungsfeldelement.module.scss'
import React, {useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import Button from '../Button'

export default function ForschungsfeldElement (props) {
    // console.log("props ForschungsfeldElement", props)
    const globalState = useContext(AppContext);
    const {state}=globalState
    const { dispatch } = globalState;

    const {showGradient,showHoverGradient,mainColor, secondColor}=props;


    const handleHover = (isHover,id) => {
        console.log("isHover",isHover)
        if(isHover){
           // dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: [id] } })
        }else{
          //  dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element:[id] } })
        }
    };


    const handleClick = (bool,id) => {
        if(state.activeFilters.some(e => e === id)) {
          dispatch({ type: ACTIONS.REMOVE_ACTIVE_FILTER, payload: { element: [id] } })
        }else{
          dispatch({ type: ACTIONS.ADD_ACTIVE_FILTER, payload: { element: [id] } })
        }
    };
  

    let Forschungsfelder;
    // type ist für Publikationen. warum? ev weil fehlende farbe vom Forschungsfeld?
    // ev ist das alles noch zu wenig abtrahiert?
    /*if(props.type) {
        var types = props.type.split('_').join(' ');
        if (types != null) {
            if(props.filter) {
                let button_style = { color: 'var(--maincolor)' };
                let btn_class;
                if(props.filter.includes(props.type)) {
                    btn_class = styles.forschungsfeldaktiv
                    button_style = {
                        color:'var(--secondcolor)'
                    }
                    if(props.showHoverGradient){
                        button_style = {
                            color: 'var(--maincolor)',
                            border: '1px solid var(--secondcolor)',
                            background: 'var(--secondcolor)'
                        }
                    }
                }
                else {
                    btn_class = styles.forschungsfeld
                    if(props.showHoverGradient){
                        button_style = {
                            color: 'var(--secondcolor)',
                            border: '1px solid var(--secondcolor)'
                        }
                    }
                }
                Forschungsfelder = <div className={styles.forschungsfeldwrapper}>
                                        <div className={btn_class} >
                                            <a style={button_style} onClick={() => props.addMoreItem(props.type)}> 
                                                {types} 
                                            </a>
                                        </div>
                                    </div>
            }
        }

    } else {*/
       
            

    if (props.forschungsfeld != null) {
        Forschungsfelder = <div className={styles.forschungsfeldwrapper}>
                                    {props.forschungsfeld.map((forschungsfeld) => {

                                        const intersection = state.hoveredElements.filter(item1 => item1===forschungsfeld.id)
                              
                                        let button_style = { 
                                            color: mainColor,//'var(--maincolor)',
                                          //  color: "#FF0000",
                                            //border: '1px solid var(--secondcolor)',
                                           // background: "none",
                                        
                                        };

                                        if(showHoverGradient){
                                            button_style = { 
                                                color: secondColor,//'var(--secondcolor)',
                                              //  color: "#FF0000",
                                                border: `1px solid ${secondColor}`,
                                             //   background: "none",
                                            
                                            };
                                        }

                                        

                                        if(state.hoveredElements.includes(forschungsfeld.id)) {
                                            console.log("hover",showGradient)
                                            button_style = {
                                                color:mainColor,
                                              //  background:`${forschungsfeld.colour.hex}`,
                                                background: `linear-gradient(to right, white, ${forschungsfeld.colour.hex})`,
                                                opacity: 1,
                                              //border: `1px solid ${forschungsfeld.colour.hex}`,
                                              //  border: `1px solid var(--lightgrey)`,
                                               // boxShadow: `3px 3px 5px ${forschungsfeld.colour.hex}`
                                            }
                                            if(showGradient){
                                                button_style = { 
                                                    color: secondColor,
                                                    border: `1px solid ${secondColor}`,
                                                }
                                            }

                                            /*if(isHoverd){
                                                button_style = { 
                                                    color: 'var(--maincolor)',
                                                    border: '1px solid var(--secondcolor)',
                                                }
                                            }*/
                                            
                                        }



                                        if(state.activeFilters.includes(forschungsfeld.id)) {                                           
                                           // if(showGradient){
                                                button_style = { 
                                                    color: secondColor,
                                                    border: `1px solid ${secondColor}`,
                                        
                                                }

                                               

                                            //}
                                        }
/*
                                            if(props.showHoverGradient){
                                                button_style = {
                                                    color: 'var(--maincolor)',
                                                    //border: '1px solid var(--secondcolor)',
                                                    background: 'var(--secondcolor)',
                                                }
                                            }
                                           
                                        }*/
                                        /*
                                        if(state.activeFilters.includes(forschungsfeld.id)) {
                                            button_style = {
                                                color:'var(--secondcolor)',
                                                border:'solid 1px var(--secondcolor)'
                                            }
                                            // if filter is active and listElement is Hovered, the active Button style
                                            if(props.showHoverGradient){
                                                button_style = {
                                                    color: 'var(--maincolor)',
                                                    //border: '1px solid var(--secondcolor)',
                                                    background: 'var(--secondcolor)',
                                                }
                                            }
                                        }*/
                                        
                                        // hover over Filter element
                                       // else if(intersection.length>0 &! props.showHoverGradient){

                                       /* else if(intersection.length>0){

                                            if(!props.showHoverGradient){
                                                button_style = {
                                                    color:'var(--maincolor)',
                                                  //  background:`${forschungsfeld.colour.hex}`,
                                                    background: `linear-gradient(to right, white, ${forschungsfeld.colour.hex})`,
                                                    opacity: 1,
                                                  //border: `1px solid ${forschungsfeld.colour.hex}`,
                                                   // border:'none',
                                                  //  border: `1px solid var(--lightgrey)`,
                                                    //transition:` all 0.2s ease`
                                                    //animation:`${styles.fadeIn} .9s ease`
                                                   // boxShadow: `3px 3px 5px ${forschungsfeld.colour.hex}`
                                                }
                                            }else{
                                                

                                            }

                                        }else{
                                            if(!props.showHoverGradient){
                                                button_style = {
                                                    color: 'var(--maincolor)',
                                                    border: '1px solid var(--maincolor)',
                                                    background: 'tranparent',
                                                }
                                            }else{
                                                button_style = {
                                                    color: 'var(--secondcolor)',
                                                    border: '1px solid var(--secondcolor)',
                                                    background: 'tranparent',
                                                }
                                            }

                                        }*/

  

                                        return (
                                            <Button 
                                                key={forschungsfeld.id}
                                                title={forschungsfeld.titel}  
                                                id={forschungsfeld.id}
                                                style={button_style} 
                                                handleClick={handleClick} 
                                                handleHover={handleHover}
                                                />
                                        )
                                    })}
                                </div>
    }
    
    else {
        Forschungsfelder = <></>
    }
 


    return (
        <div>
            {Forschungsfelder}
        </div>
    )
    
  }

  ForschungsfeldElement.defaultProps = {

    showGradient:false,
   showHoverGradient:false,
   mainColor:"var(--maincolor)", 
   secondColor:"var(--secondcolor)"

   
  }
