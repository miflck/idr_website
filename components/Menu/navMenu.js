import styles from './menu.module.scss'
import React, { useState } from 'react';
import { useTranslation } from 'next-i18next'
import Linkneu from './Linkneu'

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
                <Linkneu href={'/'} sitetitle={'NEWS'}></Linkneu>
                <Linkneu href={'/projekte'} sitetitle={'PROJEKTE'}></Linkneu>
                <Linkneu href={'/editorial'} sitetitle={'EDITORIAL'}></Linkneu>
                <Linkneu href={'/team'} sitetitle={'TEAM'}></Linkneu>
                <Linkneu href={'/publikationen'} sitetitle={'PUBLIKATIONEN'}></Linkneu>
                <Linkneu href={'/veranstaltungen'} sitetitle={'VERANSTALTUNGEN'}></Linkneu>
          </div>
        }
      </div>
    );
  };

    export default NavMenu;