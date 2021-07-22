import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const AudioVisual = (data) => {
  const { t } = useTranslation('common')
// console.log("DAta", data)
  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>
        
        <div className={styles.columnwrapper}>  
          {/* speziell AudioVisual */}
          <div className={styles.subwrapper}>
              <div className={styles.subtitel}> {t("AudioVisualType")}</div>
              {data.audio_visual_type}
          </div>
          <div className={styles.subwrapper}>
              <div className={styles.subtitel}> {t("Link")}</div>
              <Link href={data.official_url}>
                <a target="_blank">{data.official_url}</a>
              </Link>
          </div>

          <All {...data}/>
        </div>
	</div>
  );
};
export default AudioVisual;

export async function getStaticProps({locale}) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}