import styles from './filterelement.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { AppContext, ACTIONS } from '../../context/state';
import Button from '../Button'

export default function FilterElement (props) {
     console.log("props Filter Element component", props)
    const { t } = useTranslation('common')

    const globalState = useContext(AppContext);
    const {state}=globalState
    const { dispatch } = globalState;

    const handleShowGradient = (val) => {
      dispatch({ type: ACTIONS.SHOW_GRADIENT, payload:{showGradient:val} }) 
    };

    const handleHover = (isHover,element) => {
      if(isHover){
          dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: [element] } })
          dispatch({ type: ACTIONS.ADD_HOVER_FILTER, payload: { element: [element] } })

      }else{
          dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element:[element] } })
          dispatch({ type: ACTIONS.REMOVE_HOVER_FILTER, payload: { element:[element] } })

      }
    };

    const handleClick = (bool,id) => {
        if(state.activeFilters.some(e => e === id)) {
          dispatch({ type: ACTIONS.REMOVE_ACTIVE_FILTER, payload: { element: [id] } })
        }else{
          dispatch({ type: ACTIONS.ADD_ACTIVE_FILTER, payload: { element: [id] } })
        }
    };
  
    let FilterElement;
    if(state.activeFilters) {
      FilterElement =  <div className={styles.filterfeldwrapper} onMouseEnter={ ()=>handleShowGradient(false)} onMouseLeave={ ()=>handleShowGradient(false)}>
                      {/*<div className={styles.deaktivieren}> <a onClick={() => props.setFilter([])} > {t("Deaktivieren")}  </a> </div>*/}
                      <div className={styles.filterauflistung}>
                        {props.filterarray.map((forschungsfeld) =>{

                          let filterId=forschungsfeld.id;
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
                            if(state.activeFilters.includes(filtertitel)) {

                            btn_class = styles.forschungsfeldaktiv
                            if (forschungsfeld.colour.hex != null) {
                              background_style_small = {
                                background: `${forschungsfeld.colour.hex}`,
                                opacity: 1,
                            //    border: `1px solid ${forschungsfeld.colour.hex}`
                                }
                            }
                          }
                          // schauen, ob der button in den HoveredElements ist
                          else if (state.hoveredFilters.some(e => e === forschungsfeld.id)) {
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
                              //  border:'1px solid white',
                                }
                            }
                          }


                          if(state.activeFilters.some(e => e === forschungsfeld.id)) {

                            btn_class = styles.forschungsfeldaktiv
                            if (forschungsfeld.colour.hex != null) {
                              background_style_small = {
                                background: `${forschungsfeld.colour.hex}`,
                                opacity: 1,
                            //    border: `1px solid ${forschungsfeld.colour.hex}`
                                }
                            }
                          }

                          else {
                            btn_class = styles.forschungsfeld
                          }

                          
                          
                         
                          return(
                            <Button 
                              title={forschungsfeld.titel}
                              id={forschungsfeld.id}  
                              style={background_style_small} 
                              handleClick={handleClick} 
                              handleHover={handleHover}
                              key={forschungsfeld.id}
                              />
      
                          )})}
                      </div>
                      </div>

  }

  return (
    <>
      {FilterElement}
    </>

  )
        
}

export async function getStaticProps({locale}) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}