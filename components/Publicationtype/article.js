import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'

const Article = (data) => {
// console.log("data im article",data)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
          {/* speziell article */}
          <div className={styles.subwrapper}>
              <div className={styles.subtitel}> {/* {t("ArticleType")}*/} Article Type</div>
              {data.article_type}
          </div>

          <All {...data}/>
        </div>
	</div>
  );
};
export default Article;