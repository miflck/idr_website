import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const MagazineArticle = (data) => {
console.log("data im MagazineArticle documents",data.documents)
console.log("data im MagazineArticle itemissues",data.item_issues)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Zusammenfassung")} */}Zusammenfassung</div>
                {data.abstract[0].text}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Publikation")} */}Publikation</div>
                {data.publication}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Herausgeber")} */}Herausgeber</div>
                {data.publisher}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Seiten")} */}Seiten</div>
                {data.pages}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Seitenumfang")} */}Seitenumfang</div>
                {data.pagerange}
            </div>


            <All {...data}/>
        </div>
	</div> 
  );
};
export default MagazineArticle;