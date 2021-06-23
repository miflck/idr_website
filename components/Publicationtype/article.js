import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'

const Article = (data) => {
// console.log("data im article",data)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        {/* speziell article */}
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Article Type</div>
            {data.article_type}
        </div>

        <All {...data}/>

	</div>
  );
};
export default Article;