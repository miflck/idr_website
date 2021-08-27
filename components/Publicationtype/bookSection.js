import React from 'react';
import styles from './publicationtype.module.scss';
import All from './all'
import { useTranslation } from 'next-i18next'

const BookSection = (data) => {
    const { t } = useTranslation('common')

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell BookSection */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Buchtitel")}</div>
                {data.book_title}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("BookType")}</div>
                {data.book_section_type}
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
export default BookSection;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }