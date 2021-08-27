import styles from './footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import i18n from "../../node_modules/i18next";

import { ChromePicker } from 'react-color';
import React, { useState } from 'react';

const Footer=(props)=>{
    const [openmain,setColorPickerOpenMain] = useState(false)
    const handleOnClickMain=(openmain)=>{
        setColorPickerOpenMain(openmain => !openmain)
    }
    const [opensecond,setColorPickerOpenSecond] = useState(false)
    const handleOnClickSecond=(opensecond)=>{
        setColorPickerOpenSecond(opensecond => !opensecond)
    }

    const router = useRouter()
    
    let LanguageButtons;
    if (router.locale.includes("en")) {
        LanguageButtons = <><Link href={router.asPath} locale="de">
                                    <a>de</a>
                            </Link>
                            <Link href={router.asPath} locale="en">
                                     <a className={styles.activelanguage}>en</a>
                             </Link>
                          </>
    } else {
        LanguageButtons = <><Link href={router.asPath} locale="de">
                                    <a className={styles.activelanguage}>de</a>
                            </Link>
                            <Link href={router.asPath} locale="en">
                                     <a >en</a>
                             </Link>
                          </>
    }
   
    return(
        < div className={styles.footerwrapper}>
            
            {LanguageButtons}

            {/* <div className={[styles.buttonsmaincolor, (openmain ? styles.open : [])].join(' ')} >
                <a onClick={handleOnClickMain} >xx</a>
                <ChromePicker className={styles.farbauswahlmaincolor}
                color={props.colorHexCode}
                onChange={e => props.setMainColor(e.hex) }
                />
            </div>

            <div className={[styles.buttonssecondcolor, (opensecond ? styles.open : [])].join(' ')}>
                <a onClick={handleOnClickSecond}>xx</a>
                <ChromePicker className={styles.farbauswahlsecondcolor}
                color={props.colorHexCodeSecond}
                onChange={e => props.setSecondColor(e.hex) }
                />
            </div> */}
            
                <Link href="/impressum">
                    <div className={styles.impressum}>Impressum</div>
                </Link>
         

        </div>
    )
}

export default Footer;



