import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const Book = (data) => {
// console.log("data im book",data.abstract[0].text)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>
        <div className={styles.columnwrapper}>  
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Abstract</div>
                {data.abstract[0].text}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("BookType")}*/} Book Type</div>
                {data.book_type}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>ISBN</div>
                {data.isbn}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Seiten")}*/}Seiten</div>
                {data.pages}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Herausgeber")}*/}Herausgeber</div>
                {data.publisher}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Serie")}*/}Serie</div>
                {data.series}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Link")}*/}Link</div>
                <Link href={data.related_url[0].url}>
                    {data.related_url[0].url}
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Book;