import React from 'react';
import styles from './publicationtype.module.scss';
import All from './all'
import { useTranslation } from 'next-i18next'

const MagazineArticle = (data) => {
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

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Publikation")}</div>
                {data.publication}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Herausgeber")}</div>
                {data.publisher}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Seitenumfang")}</div>
                {data.pages}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Seiten")}</div>
                {data.pagerange}
            </div>


            <All {...data}/>
        </div>
	</div> 
  );
};
export default MagazineArticle;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }