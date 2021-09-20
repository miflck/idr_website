import styles from './filterelement.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { AppContext, ACTIONS } from '../../context/state';

export default function FilterElement (props) {
    // console.log("props Filter Element component", props)
    const { t } = useTranslation('common')

    const globalState = useContext(AppContext);
    const {state}=globalState
    const { dispatch } = globalState;
    const handleShowGradient = (val) => {
      dispatch({ type: ACTIONS.SHOW_GRADIENT, payload:{showGradient:val} }) 
    };

    const handleHover = (isHover,forschungsfeld) => {
      if(isHover){
          dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: [forschungsfeld] } })
      }else{
          dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element:[forschungsfeld] } })
      }
  };
  
    
    console.log(state)
  let FilterElement;
  if(props.filter) {



    FilterElement =  <div className={styles.filterfeldwrapper} onMouseEnter={ ()=>handleShowGradient(false)} onMouseLeave={ ()=>handleShowGradient(false)}>
                      <div className={styles.deaktivieren}> <a onClick={() => props.setFilter([])} > {t("Deaktivieren")}  </a> </div>
                      <div className={styles.filterauflistung}>
                        {props.filterarray.map((forschungsfeld) =>{

                           let filtertitel;
                           let filtertitelohneunderline;
                           if(forschungsfeld.titel == null) {
                            //  console.log("hier publitypes", forschungsfeld)
                             filtertitelohneunderline = forschungsfeld.split('_').join(' ');
                             filtertitel = forschungsfeld;
                           } else {
                             filtertitelohneunderline = forschungsfeld.titel;
                             filtertitel = forschungsfeld.titel;
                           }

                           let background_style_small;
                          /*if(props.showHoverGradient) {
                            
                            background_style_small = {
                            // background: `linear-gradient(to right, ${forschungsfeld.colour.hex}, white)`,
                            background: `${forschungsfeld.colour.hex}`,
                            opacity: 1,
                            // animation: `${styles.fadeIn} 0.5s ease`
                            }
                          } else {
                            background_style_small ={
                              background: 'white',
                            }
                          }*/

                          let btn_class;
                          if(props.filter.includes(filtertitel)) {
                            btn_class = styles.forschungsfeldaktiv
                            if (forschungsfeld.colour.hex != null) {
                              background_style_small = {
                                background: `${forschungsfeld.colour.hex}`,
                                opacity: 1,
                                border: `1px solid ${forschungsfeld.colour.hex}`
                                }
                            }
                          }
                          // schauen, ob der button in den HoveredElements ist
                          else if (state.hoveredElements.some(e => e.titel === filtertitel)) {
                            if (forschungsfeld.colour != null) {
                              // Team funktionen haben keine farbe

                              background_style_small = {
                              // background:`rgba( ${forschungsfeld.colour.red},${forschungsfeld.colour.green},${forschungsfeld.colour.blue},0.1)`,
                              //color:` ${forschungsfeld.colour.hex}`,
                                color:'var(--maincolor)',
                               // background:`${forschungsfeld.colour.hex}`,
                                background: `linear-gradient(to right, white, ${forschungsfeld.colour.hex})`,

                                opacity: 1,
                                //border: `1px solid ${forschungsfeld.colour.hex}`,
                                border:'1px solid white',
                                }
                            }
                          }

                          else {
                            btn_class = styles.forschungsfeld
                          }

                          
                          
                         
                          return(
                            <div className={btn_class} onMouseEnter={ ()=>handleHover(true,forschungsfeld)} onMouseLeave={ ()=>handleHover(false,forschungsfeld)}>
                              <a 
                                style={background_style_small}
                                onClick={() => props.addMoreItem(filtertitel)}
                                key={filtertitel}
                              > 
                                {filtertitelohneunderline} 
                              </a>
                            </div>
                          )})}
                      </div>
                      </div>
  }

  return (
    <div>
      {FilterElement}
    </div>

  )
        
}

export async function getStaticProps({locale}) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}