import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './menu.module.scss'

const Linkneu = ({href, sitetitle}) => {
  const router = useRouter()

      return (
        <Link href={href}>
          <div className={[styles.menusitelinks, (router.asPath === href ? styles.aktiv : [])].join(' ')}>
            <a>{sitetitle}</a>
          </div>
        </Link>
      )
}

export default Linkneu;