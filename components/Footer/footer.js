import styles from './footer.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
 import i18n from "../../node_modules/i18next";


import { HuePicker, ChromePicker } from 'react-color';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext'; // import based on where you put it

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
    // console.log("router",router)
    // useRouter zum rausfinden, wo man ist
    // const changeLanguage = (lng) => {
    //     i18n.changeLanguage(lng);
    //   }

    const  state  = useAppContext();

    console.log("STATE ",state)
    const [colorHexCode, setColorHexCode] = useState('#000000');
    const [colorHexCodeSecond, setColorHexCodeSecond] = useState('#ffffff');

    const [newColor, setNewColor ] = useState(false);
    const [newColorSecond, setNewColorSecond ] = useState(false);

    /*
    useEffect(() => {
       // const root = document.documentElement;
       // root?.style.setProperty('--maincolor', `${colorHexCode}`);
        
       console.log("use Effect colorHexCode")
state.setColorHexCode(colorHexCode)


    },[colorHexCode])

    const [newColorSecond, setNewColorSecond ] = useState(false);
    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty('--secondcolor', `${colorHexCodeSecond}`)
        console.log("use Effect newColorSecond")
    },[colorHexCodeSecond])
*/
    return(
        < div className={styles.footerwrapper}>
            <a href="https://hkb-idr.ch/#publikationen">Footer Link</a>
            
            <Link href={router.asPath} locale="de">
      		    <a>de</a>
    	    </Link>
            <Link href={router.asPath} locale="en">
      		    <a>en</a>
    	    </Link>
            
            {/* <button onClick={() => changeLanguage('de')}>de</button>
            <button onClick={() => changeLanguage('en')}>en</button> */}

        {/* Farbe wechseln als Extra einbauen  */}
            <div
            className={[styles.buttonsmaincolor, (openmain ? styles.open : [])].join(' ')} 
            >
                <a onClick={handleOnClickMain} >xx</a>
                <ChromePicker className={styles.farbauswahlmaincolor}
                color={colorHexCode}
                onChange={e => state.setColorHexCode(e.hex) } 
               // onClick={() => setNewColor(newColor)}
                />
            </div>

            <div
            className={[styles.buttonssecondcolor, (opensecond ? styles.open : [])].join(' ')}
            >
                <a onClick={handleOnClickSecond}>xx</a>
                <ChromePicker className={styles.farbauswahlsecondcolor}
                color={colorHexCodeSecond}
                onChange={e => state.setColorHexCodeSecond(e.hex) } 
                //onClick={() => state.setNewColorSecond(newColorSecond)}
            />
            </div>

            
            

        </div>
    )
}

export default Footer;



