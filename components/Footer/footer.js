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
    //keine Ahnung, für was es diese zwei Funktionien gebraucht hat...
    // const [newColor, setNewColor ] = useState(false);
    // const [newColorSecond, setNewColorSecond ] = useState(false);

    return(
        < div className={styles.footerwrapper}>
            {/* <a href="https://hkb-idr.ch/#publikationen">Footer Link</a> */}
            
            <Link href={router.asPath} locale="de">
      		    <a>de</a>
    	    </Link>
            <Link href={router.asPath} locale="en">
      		    <a>en</a>
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



