import styles from './menu.module.scss'
import React, { useState } from 'react';
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import ActiveLink from './ActiveLink'
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
              {/* <style jsx>{`
                .active:after {
                  content: ' (current page)';
                }
              `}</style> */}
                <Link href={{pathname: '/'}} activeClassName={styles.activelink}>
                  <div>{t('News')}</div>
                </Link>

                <div>
                <ActiveLink href={{pathname: '/projekte'}} activeClassName={styles.activelink} >
                <a>
                  {t('Projektseite')} 
                  </a>
                </ActiveLink>
                </div>
              
                <Linkneu href={{pathname: '/editorial'}} activeClassName={styles.activelink}>
                <div>{t('Editorialseite')}</div>
                </Linkneu>
              
           
                <Link href={{pathname: '/team'}} activeClassName={styles.activelink}>
                <div>{t('Teamseite')}</div>
                </Link>
   
  
                <Link href={{pathname: '/publikationen'}} activeClassName={styles.activelink}>
                <div>{t('Publikaionenseite')}</div>
                </Link>
      
             
                <Link href={{pathname: '/veranstaltungen'}} activeClassName={styles.activelink}>
                <div>{t('Veranstaltungsseite')}</div>
                </Link>

                {/* <div onClick={() => { window.history.back();}} className={styles.retour}><a>« zur letzen Seite</a></div> */}
           
          </div>
        }
      </div>
    );
  };

    export default NavMenu;

    // export async function getStaticProps({locale}) {
    //   console.log("..",locale)
    //   return {
    //     props: {
    //       ...await serverSideTranslations(locale, ['common']),
    //     }, // will be passed to the page component as props
    //   }
    // }
    