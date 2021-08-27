import React from 'react';
import styles from './publicationtype.module.scss';
import All from './all'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Software = (data) => {
    const { t } = useTranslation('common')

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell Software */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("SoftwareType")}</div>
                {data.software_type}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Herausgeber")}</div>
                {data.publisher}
            </div>
        
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Link")}</div>
                <Link href={data.related_url[0].url}>
                  <a target="_blank">{data.related_url[0].url}</a>
                </Link>
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("OffiziellerLink")}</div>
                <Link href={data.official_url}>
                  <a target="_blank">{data.official_url}</a>
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Software;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }