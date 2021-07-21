import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const Software = (data) => {
// console.log("data im Software",data.abstract[0].text)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell Software */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("SoftwareType")} */}Software Type</div>
                {data.software_type}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Herausgeber")} */}Herausgeber</div>
                {data.publisher}
            </div>
        
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Link")} */}Link</div>
                <Link href={data.related_url[0].url}>
                    {data.related_url[0].url}
                </Link>
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("OffiziellerLink")} */}Offizieller Link</div>
                <Link href={data.official_url}>
                    {data.official_url}
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Software;