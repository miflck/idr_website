import styles from './filterelement.module.scss'
import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'next-i18next'

export default function FilterElement (props) {
    console.log("props Filter Element", props)
    const { t } = useTranslation('common')

  let FilterElement;
  if(props.filter) {
    FilterElement =  <div className={styles.filterfeldwrapper} >
                      <div className={styles.deaktivieren}> <a onClick={() => props.setFilter([])} > {t("Deaktivieren")}  </a> </div>
                      <div className={styles.filterauflistung}>
                        
                        {props.props.map((forschungsfeld) =>{
                          let btn_class;
                          if(props.filter.includes(forschungsfeld.titel)) {
                            btn_class = styles.forschungsfeldaktiv
                          }
                          else {
                            btn_class = styles.forschungsfeld
                          }
                          return(
                            <span className={btn_class}>
                              <a 
                              onClick={() => props.addMoreItem(forschungsfeld.titel)}
                              key={forschungsfeld.titel}
                              > 
                                {forschungsfeld.titel} 
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