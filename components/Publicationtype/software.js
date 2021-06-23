import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const Software = (data) => {
// console.log("data im Software",data.abstract[0].text)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        {/* speziell Software */}
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Software Type</div>
            {data.software_type}
        </div>
        
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Publisher</div>
            {data.publisher}
        </div>
       
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Link</div>
            <Link href={data.related_url[0].url}>
                {data.related_url[0].url}
            </Link>
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Official Link</div>
            <Link href={data.official_url}>
                {data.official_url}
            </Link>
        </div>

        <All {...data}/>

	</div>
  );
};
export default Software;