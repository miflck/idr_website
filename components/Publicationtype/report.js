import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import { useTranslation } from 'next-i18next'

const Report = (data) => {
    const { t } = useTranslation('common')

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell article */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("ReportType")}</div>
                {data.report_type}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Serie")}</div>
                {data.series}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>ISBN</div>
                {data.isbn}
            </div>
        
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Herausgeber")}</div>
                {data.publisher}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Ort")}</div>
                {data.place_of_pub}
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Report;


export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }