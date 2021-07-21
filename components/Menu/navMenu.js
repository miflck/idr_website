import styles from './menu.module.scss'
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next'
import SiteLink from './SiteLink'

const NavMenu = (props)=> {
  const { t } = useTranslation('common')

  const [open,setMenuOpen] = useState(false)
  const handleOnClick=(open)=>{
    setMenuOpen(open => !open)
  }

  return (
    <div className={[styles.menuwrapper, (open ? styles.open : [])].join(' ')}>
        <div className={styles.menubutton} onClick={handleOnClick} >
          <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em"  viewBox="0 0 87.9 86">
                <g>
                  <line className="a" x1="44" x2="44" y2="86"/>
                  <line className="a" x1="1" y1="43" x2="86.9" y2="43"/>
                </g>
              </svg>
          </span>
          <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em"  viewBox="0 0 87.9 86">
                  <line className="a" x1="1" y1="43" x2="86.9" y2="43"/>
              </svg>
          </span>
        </div>
        {
          <div className={styles.menucontent}>
                <SiteLink href={'/'} sitetitle={'NEWS'}></SiteLink>
                <SiteLink href={'/projekte'} sitetitle={'PROJEKTE'}></SiteLink>
                <SiteLink href={'/team'} sitetitle={'TEAM'}></SiteLink>
                <SiteLink href={'/publikationen'} sitetitle={'PUBLIKATIONEN'}></SiteLink>
                <SiteLink href={'/veranstaltungen'} sitetitle={'VERANSTALTUNGEN'}></SiteLink>
                <SiteLink href={'/editorial'} sitetitle={'EDITORIAL'}></SiteLink>
          </div>
        }
      </div>
    );
  };

    export default NavMenu;