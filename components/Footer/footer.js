import styles from './footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import i18n from "../../node_modules/i18next";

import { HuePicker, ChromePicker } from 'react-color';
import React, { useState } from 'react';

const Footer=(props)=>{

    // console.log("props from footer",props)

    const [openmain,setColorPickerOpenMain] = useState(false)
    const handleOnClickMain=(openmain)=>{
        setColorPickerOpenMain(openmain => !openmain)
    }
    const [opensecond,setColorPickerOpenSecond] = useState(false)
    const handleOnClickSecond=(opensecond)=>{
        setColorPickerOpenSecond(opensecond => !opensecond)
    }

    const router = useRouter()
    
    const [aktiv, setAktiv] = useState(false)
    // const handleLanguageChange=(aktiv) => {
    //     setAktiv(aktiv => !aktiv)
    // }

    // if (router.locale.includes("en")) {
    //     setAktiv(aktiv)
    //     console.log("englisch", aktiv)
    // }


// const [open,setSearchbarOpen] = useState(false)
// const handleOnClick=(open)=>{
//   setSearchbarOpen(open => !open)
// }
    // dann im java unten 
    // className={[styles.suchfeldwrapper, (open ? styles.open : [])].join(' ')}

    // let LanguageButtons;
    // if (changeLanguageState) {
    //     LanguageButtons = <><Link href={router.asPath} locale="de" onClick={handleLanguageChange}>
    //                                 <a className={styles.activelanguage}>de</a>
    //                         </Link>
    //                         <Link href={router.asPath} locale="en" onClick={handleLanguageChange}>
    //                                 <a>en</a>
    //                         </Link></>
    // }
    // else{
    //     LanguageButtons = <><Link href={router.asPath} locale="de" onClick={handleLanguageChange}>
    //                                 <a>de</a>
    //                         </Link>
    //                         <Link href={router.asPath}  locale="en" onClick={handleLanguageChange}>
    //                                 <a className={styles.activelanguage}>en</a>
    //                         </Link></>
    // }
    return(
        < div className={styles.footerwrapper}>
            
            {/* {LanguageButtons} */}
            <Link href={router.asPath} locale="de" > 
                <a className={[styles.languebutton, (aktiv ? styles.aktiv : [])].join(' ')}>de</a>
            </Link>
            <Link href={router.asPath} locale="en"  >
                <a className={[styles.languebutton, (aktiv ? styles.aktiv : [])].join(' ')}>en</a>
            </Link>
           
        {/* Farbe wechseln als Extra einbauen  */}
            <div className={[styles.buttonsmaincolor, (openmain ? styles.open : [])].join(' ')} >
                <a onClick={handleOnClickMain} >xx</a>
                <ChromePicker className={styles.farbauswahlmaincolor}
                color={props.colorHexCode}
                onChange={e => props.setMainColor(e.hex) }
             //   onClick={() => setNewColor(newColor)}
                />
            </div>

            <div className={[styles.buttonssecondcolor, (opensecond ? styles.open : [])].join(' ')}>
                <a onClick={handleOnClickSecond}>xx</a>
                <ChromePicker className={styles.farbauswahlsecondcolor}
                color={props.colorHexCodeSecond}
                onChange={e => props.setSecondColor(e.hex) }
             //   onClick={() => setNewColorSecond(newColorSecond)}
                />
            </div>

        </div>
    )
}

export default Footer;



