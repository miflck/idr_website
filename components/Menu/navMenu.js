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
    <div
        className={[styles.menuwrapper, (open ? styles.open : [])].join(' ')}
      >
        <div
          className={styles.menubutton}
          onClick={handleOnClick}
        >
          <span>+</span>
          <span>–</span>
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