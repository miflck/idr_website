import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const Other = (data) => {
console.log("data im other documents",data.documents)
console.log("data im other itemissues",data.item_issues)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Abstract</div>
            {data.abstract[0].text}
        </div>

        {/* speziell Other */}
        
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Collection Title</div>
            {data.collection_title}
        </div>
        
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Link</div>
            <Link href={data.official_url}>
                {data.official_url}
            </Link>
        </div>

        <All {...data}/>

	</div>
  );
};
export default Other;