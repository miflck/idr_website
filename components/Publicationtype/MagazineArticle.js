import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const MagazineArticle = (data) => {
console.log("data im MagazineArticle documents",data.documents)
console.log("data im MagazineArticle itemissues",data.item_issues)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Abstract</div>
            {data.abstract[0].text}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Publication</div>
            {data.publication}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Publisher</div>
            {data.publisher}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Pages</div>
            {data.pages}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Pagerange</div>
            {data.pagerange}
        </div>


        <All {...data}/>

	</div>
  );
};
export default MagazineArticle;