import styles from './menu.module.scss'
import React, { useState } from 'react';

import Link from 'next/link'
import { useTranslation } from 'next-i18next'


const NavMenu = (props)=> {
  console.log("Menu props",props)

  const [open,setMenuOpen] = useState(false)
  const handleOnClick=(open)=>{
    setMenuOpen(open => !open)
  }

  const { t } = useTranslation('common')

    return (
    <div
        className={[styles.menuwrapper, (open ? styles.open : [])].join(' ')}
      >
        <div
          className={styles.menubutton}
          onClick={handleOnClick}
        >
          {/* das in den header unter den andern setzen */}
          <span>+</span>
          <span>–</span>
        </div>
        {
          <div className={styles.menucontent}>
              <div>
                
                <Link href={{pathname: '/projekte'}} activeClassName={styles.activelink}>
                  {/* <Trans> */}
                  Projekte
          
                  {/* </Trans> */}
                </Link>
              </div>
              <div>
                <Link href={{pathname: '/editorial'}} activeClassName={styles.activelink}>
                  {/* <Trans> */}
                    Editorial
                  {/* </Trans> */}
                </Link>
              </div>
              <div>
                <Link href={{pathname: '/team'}} activeClassName={styles.activelink}>
                  {/* <Trans> */}
                    Team
                  {/* </Trans> */}
                </Link>
              </div> 
              <div>
                <Link href={{pathname: '/publikationen'}} activeClassName={styles.activelink}>
                  {/* <Trans> */}
                    Publikationen
                  {/* </Trans> */}
                </Link>
              </div>
              <div>
                <Link href={{pathname: '/veranstaltungen'}} activeClassName={styles.activelink}>
                  {/* <Trans> */}
                    Veranstaltungen
                  {/* </Trans> */}
                </Link>
              </div>
          </div>
        }
      </div>
    );
  };

    export default NavMenu;
