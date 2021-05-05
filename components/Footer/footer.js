import styles from './footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import i18n from "../../node_modules/i18next";
import { SketchPicker } from 'react-color';
import React, { useState } from 'react';

const Footer=(props)=>{
    // console.log("Footer",props)
    // const {children}=props || {}
    const router = useRouter()
    // console.log("router",router)
    // useRouter zum rausfinden, wo man ist
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    //   }

    const [colorHexCode, setColorHexCode] = useState('#000000');
    const setNewMainColor=()=>{
        // setProperty['--maincolor'] = '{colorHexCode}'
        // document.querySelector(":root").style.setProperty('--maincolor', `${colorHexCode}`);
      }

    return(
        < div className={styles.footerwrapper}>
            <a href="https://hkb-idr.ch/#publikationen">Footer Link</a>
            
            <Link href={router.asPath} locale="de">
      		    <a>de</a>
    	    </Link>
            <Link href={router.asPath} locale="en">
      		    <a>en</a>
    	    </Link>
{/* 
        <button onClick={() => changeLanguage('de')}>de</button>
        <button onClick={() => changeLanguage('en')}>en</button> */}

            {/* Farbe wechseln als Extra, noch einbauen  */}
            <a 
            // onClick={} 
            className={styles.buttons} id={styles.maincolor}>
                2
            </a>
            <a 
            // onClick={} 
            className={styles.buttons} id={styles.secondcolor}>
                2
            </a>

            <SketchPicker
                color={colorHexCode}
                onChange={e => setColorHexCode(e.hex)
                // ,setNewMainColor({colorHexCode})
                } />
        
            {colorHexCode}



            

        </div>
    )
}

export default Footer;



