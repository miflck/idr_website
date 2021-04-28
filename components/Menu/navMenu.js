import styles from './menu.module.scss'
import React, { useState } from 'react';

import Link from 'next/link'

const NavMenu = (props)=> {

  const [open,setMenuOpen] = useState(false)
  const handleOnClick=(open)=>{
    setMenuOpen(open => !open)
  }

    return (
    <div
        className={[styles.menuwrapper, (open ? styles.open : [])].join(' ')}
      >
        <div
          className={styles.menubutton}
          onClick={handleOnClick}
        >
          +
        </div>
        {
          <div className={styles.menucontent}>
              <div>
                <Link href={{pathname: '/projekte'}} activeClassName={styles.activelink}>
                    Projekte
                </Link>
              </div>
              <div>
                <Link href={{pathname: '/veranstaltungen'}} activeClassName={styles.activelink}>
                    Veranstaltungen
                </Link>
              </div>
              <div>
                <Link href={{pathname: '/team'}} activeClassName={styles.activelink}>
                    Team
                </Link>
              </div> 
          </div>
        }
      </div>
    );
  };

    export default NavMenu;