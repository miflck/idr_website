import styles from './forschungsfeldelement.module.scss'
import React, {useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import Button from '../Button'

export default function ForschungsfeldElement (props) {
    // console.log("props ForschungsfeldElement", props)
    const globalState = useContext(AppContext);
    const {state}=globalState
    const { dispatch } = globalState;
    const handleHover = (isHover,id) => {
        if(isHover){
          //  dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: [id] } })
        }else{
          //  dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element:[id] } })
        }
    };

    let Forschungsfelder;
    // type ist für Publikationen. warum? ev weil fehlende farbe vom Forschungsfeld?
    // ev ist das alles noch zu wenig abtrahiert?
    /*if(props.type) {
        var types = props.type.split('_').join(' ');
        if (types != null) {
            if(props.filter) {
                let hover_class = { color: 'var(--maincolor)' };
                let btn_class;
                if(props.filter.includes(props.type)) {
                    btn_class = styles.forschungsfeldaktiv
                    hover_class = {
                        color:'var(--secondcolor)'
                    }
                    if(props.showHoverGradient){
                        hover_class = {
                            color: 'var(--maincolor)',
                            border: '1px solid var(--secondcolor)',
                            background: 'var(--secondcolor)'
                        }
                    }
                }
                else {
                    btn_class = styles.forschungsfeld
                    if(props.showHoverGradient){
                        hover_class = {
                            color: 'var(--secondcolor)',
                            border: '1px solid var(--secondcolor)'
                        }
                    }
                }
                Forschungsfelder = <div className={styles.forschungsfeldwrapper}>
                                        <div className={btn_class} >
                                            <a style={hover_class} onClick={() => props.addMoreItem(props.type)}> 
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

                                        let hover_class = { 
                                            color: 'var(--maincolor)',

                                        };
                                        let btn_class;
                                        if(props.filter.includes(forschungsfeld.titel)) {
                                            btn_class = styles.forschungsfeldaktiv
                                            hover_class = {
                                                color:'var(--secondcolor)'
                                            }
                                            if(props.showHoverGradient){
                                                hover_class = {
                                                    color: 'var(--maincolor)',
                                                    //border: '1px solid var(--secondcolor)',
                                                    background: 'var(--secondcolor)',
                                                }
                                            }
                                        }
                                        
                                        
                                        else if(intersection.length>0 &! props.showHoverGradient){
                                            btn_class = styles.forschungsfeld

                                            hover_class = {
                                                color:'var(--maincolor)',
                                                //background:`${forschungsfeld.colour.hex}`,
                                                background: `linear-gradient(to right, white, ${forschungsfeld.colour.hex})`,

                                                opacity: 1,
                                              //border: `1px solid ${forschungsfeld.colour.hex}`,
                                               // border:'none',
                                              //  border: `1px solid var(--lightgrey)`,
                                                //transition:` all 0.2s ease`
                                                //animation:`${styles.fadeIn} .9s ease`
                                               // boxShadow: `3px 3px 5px ${forschungsfeld.colour.hex}`
                                            }

                                        }
                                        else {
                                            btn_class = styles.forschungsfeld
                                            if(props.showHoverGradient){
                                                hover_class = {
                                                    color: 'var(--secondcolor)',
                                                   border: '1px solid var(--secondcolor)',
                                                   // transition:` all 0.2s ease`

                                                }
                                            }
                                        }
                                        return (
                                            <Button 
                                                key={forschungsfeld.id}
                                                title={forschungsfeld.titel}  
                                                id={forschungsfeld.id}
                                                style={hover_class} 
                                                handleClick={props.addMoreItem} 
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
