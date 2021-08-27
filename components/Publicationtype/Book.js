import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Book = (data) => {
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
                <div className={styles.subtitel}>{t("BookType")}</div>
                {data.book_type}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>ISBN</div>
                {data.isbn}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Seiten")}</div>
                {data.pages}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Herausgeber")}</div>
                {data.publisher}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Serie")}</div>
                {data.series}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Link")}</div>
                <Link href={data.related_url[0].url}>
                    <a target="_blank">{data.related_url[0].url}</a>
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Book;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }