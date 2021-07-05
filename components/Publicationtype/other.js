import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const Other = (data) => {
console.log("data im other documents",data.documents)
console.log("data im other itemissues",data.item_issues)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            <a>{data.title[0].text}</a>
        </div>

        <div className={styles.columnwrapper}>  
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Abstract</div>
                {data.abstract[0].text}
            </div>

            {/* speziell Other */}
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Collection Title</div>
                {data.collection_title}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Link</div>
                <Link href={data.official_url}>
                    {data.official_url}
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Other;