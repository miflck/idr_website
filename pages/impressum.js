// import { request,EDITORIALTEXTE } from "../lib/datocms";
import styles from './impressum.module.scss'
import Layout from '../Components/Layout/layout'
import Container from '../Components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextElement from '../Components/TextElement/textElement'
import ButtonLink from '../Components/ButtonLink/buttonLink'
import React, { useState, useEffect } from 'react'


const Impressum =(props)=>{
//   const {editorialtexte:{allEditorials}}=props;
//   const {editorialtexte:{allProjekts}}=props;
//   const {editorialtexte:{allForschungsfelders}}=props;

  const { t } = useTranslation('common')

 
  

    return (
      <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
        
       <div>Impressum?</div>
      </Layout>
    )
}

 export default Impressum;



// de mit default alng ersetzten falls die nicht de ist
export async function getStaticProps({locale}) {
    // const editorialtexte = await request({
    //     query: EDITORIALTEXTE,  variables: {locale:locale},
    //   });

    return {
      props: {
        // editorialtexte,   
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }