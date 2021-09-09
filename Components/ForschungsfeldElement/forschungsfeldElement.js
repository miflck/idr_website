import styles from './forschungsfeldelement.module.scss'
import React, {useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';

export default function ForschungsfeldElement (props) {
    // console.log("props ForschungsfeldElement", props)
    const globalState = useContext(AppContext);
    const {state}=globalState
    const { dispatch } = globalState;
    const handleHover = (isHover,title) => {
        if(isHover){
           // dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: title } })
        }else{
           // dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element: title } })
        }
    };




    let Forschungsfelder;
    






    // type ist für Publikationen. warum? ev weil fehlende farbe vom Forschungsfeld?
    // ev ist das alles noch zu wenig abtrahiert?
    if(props.type) {
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

    } else {
        // wenn der "Button" ein Forschungsfeld ist
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

            

    if (props.forschungsfeld != null) {
        Forschungsfelder = <div className={styles.forschungsfeldwrapper}>
                                    {props.forschungsfeld.map((forschungsfeld) => {
        const intersection = state.hoveredElements.filter(item1 => item1.titel.normalize()===forschungsfeld.titel.normalize())

                                        let hover_class = { 
                                            color: 'var(--maincolor)',
                                            transition:` all 0.2s ease`
 
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
                                                    border: '1px solid var(--secondcolor)',
                                                    background: 'var(--secondcolor)',
                                                    transition:` all 0.2s ease`
                                                }
                                            }
                                        }

                                        else if(intersection.length>0 &! props.showHoverGradient){
                                            btn_class = styles.forschungsfeld

                                            hover_class = {
                                                color:'var(--maincolor)',
                                               // background:`${forschungsfeld.colour.hex}`,
                                                background: `linear-gradient(to right, white, ${forschungsfeld.colour.hex})`,

                                                opacity: 1,
                                                border: `1px solid ${forschungsfeld.colour.hex}`,
                                              //  border: `1px solid var(--lightgrey)`,

                                                transition:` all 0.2s ease`
                                            }

                                        }
                                        else {
                                            btn_class = styles.forschungsfeld
                                            if(props.showHoverGradient){
                                                hover_class = {
                                                    color: 'var(--secondcolor)',
                                                    border: '1px solid var(--secondcolor)',
                                                    transition:` all 0.2s ease`

                                                }
                                            }
                                        }
                                        return (
                                             <div className={btn_class}>
                                                <a 
                                                onMouseEnter={ ()=>handleHover(true,forschungsfeld.titel)} 
                                                onMouseLeave={ ()=>handleHover(false,forschungsfeld.titel)}
                                                onClick={() => props.addMoreItem(forschungsfeld.titel)}
                                                key={forschungsfeld.titel} style={hover_class}
                                                > 
                                                {forschungsfeld.titel}
                                            </a>
                                            </div>
                                        )
                                    })}
                                </div>
    }
    
    else {
        Forschungsfelder = <></>
    }
}
    return (
        <div>
            {Forschungsfelder}
        </div>
    )
    
  }
