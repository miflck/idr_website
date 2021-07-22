import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Other = (data) => {
    const { t } = useTranslation('common')

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Zusammenfassung")}</div>
                {data.abstract[0].text}
            </div>

            {/* speziell Other */}
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("TitelSammlung")}</div>
                {data.collection_title}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Link")}</div>
                <Link href={data.official_url}>
                  <a target="_blank">{data.official_url}</a>
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Other;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }