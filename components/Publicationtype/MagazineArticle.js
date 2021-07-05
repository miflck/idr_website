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
            <a>{data.title[0].text}</a>
        </div>

        <div className={styles.columnwrapper}>  
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Abstract</div>
                {data.abstract[0].text}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Publication</div>
                {data.publication}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Publisher</div>
                {data.publisher}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Pages</div>
                {data.pages}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Pagerange</div>
                {data.pagerange}
            </div>


            <All {...data}/>
        </div>
	</div> 
  );
};
export default MagazineArticle;