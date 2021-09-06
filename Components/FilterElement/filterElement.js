import styles from './filterelement.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'

export default function FilterElement (props) {
    console.log("props Filter Element component", props)
    const { t } = useTranslation('common')

    

  let FilterElement;
  if(props.filter) {
    FilterElement =  <div className={styles.filterfeldwrapper} >
                      <div className={styles.deaktivieren}> <a onClick={() => props.setFilter([])} > {t("Deaktivieren")}  </a> </div>
                      <div className={styles.filterauflistung}>
                        {props.filterarray.map((forschungsfeld) =>{

                           let filtertitel;
                           let filtertitelohneunderline;
                           if(forschungsfeld.titel == null) {
                             console.log("hier publitypes", forschungsfeld)
                             filtertitelohneunderline = forschungsfeld.split('_').join(' ');
                             filtertitel = forschungsfeld;
                           } else {
                             filtertitelohneunderline = forschungsfeld.titel;
                             filtertitel = forschungsfeld.titel;
                           }

                          let btn_class;
                          if(props.filter.includes(filtertitel)) {
                            btn_class = styles.forschungsfeldaktiv
                          }
                          else {
                            btn_class = styles.forschungsfeld
                          }

                          
                          let background_style_small;
                          // if(props.showHoverGradient) {
                            background_style_small = {
                            // background: `linear-gradient(to right, ${forschungsfeld.colour.hex}, white)`,
                            background: `${forschungsfeld.colour.hex}`,
                            opacity: 1,
                            // animation: `${styles.fadeIn} 0.5s ease`
                            }
                          // } else {
                          //   background_style_small ={
                          //     background: 'white',
                          //   }
                          // }
                         
                          return(
                            <span className={btn_class}>
                              <a 
                                style={background_style_small}
                                onClick={() => props.addMoreItem(filtertitel)}
                                key={filtertitel}
                              > 
                                {filtertitelohneunderline} 
                              </a>
                            </span>
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