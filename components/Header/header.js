import NavMenu from '../Menu/navMenu'
import styles from './header.module.scss'

import React, { useState } from 'react';

const Header=(props)=>{
    // console.log("Header ",props)
    // const {children}=props || {}

    // const [search, setSearch] = useState('')


    return(
        <div className={styles.headercontainer}>
        <title>IDR</title>
        <link rel="icon" href="../favicon.ico"/>

        <h2>HKB — Institute of Design Research</h2>
            {/* Suchfeld */}
            {/* <input 
                    type="text" 
                    placeholder="Suche" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    /> */}

        <NavMenu/>
        </div>
    )
}

export default Header;



