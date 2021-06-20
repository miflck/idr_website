import '../styles/globals.scss'
import '../styles/Home.module.scss'
import '../styles/variables.scss'
import { appWithTranslation } from 'next-i18next'
import React, { useState, useEffect } from 'react';


import { StateProvider } from '../context/state.js'



function MyApp({ Component, pageProps }) {

  const [colorHexCode, setColorHexCode] = useState('#000000');
  const [colorHexCodeSecond, setColorHexCodeSecond] = useState('#fefefe');


  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty('--maincolor', `${colorHexCode}`);
    // console.log("USe Effect in App",colorHexCode)
  },[colorHexCode])

  useEffect(() => {
    const root = document.documentElement;
    root?.style.setProperty('--secondcolor', `${colorHexCodeSecond}`);
},[colorHexCodeSecond])

  return (
    <StateProvider>
    <Component {...pageProps} setMainColor={setColorHexCode} setSecondColor={setColorHexCodeSecond}  colorHexCode={colorHexCode} colorHexCodeSecond={colorHexCodeSecond}/>
    </StateProvider>

  )
}



 export default appWithTranslation(MyApp)
