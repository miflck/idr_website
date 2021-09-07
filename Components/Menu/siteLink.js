import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './menu.module.scss'

const SiteLink = ({href, sitetitle}) => {
  const router = useRouter()
      return (
        <Link href={href}>
          <div className={[styles.menusitelinks, (router.asPath === href ? styles.aktiv : [])].join(' ')}>
            {sitetitle}
          </div>
        </Link>
      )
}

export default SiteLink;