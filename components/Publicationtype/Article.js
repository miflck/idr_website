import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import { useTranslation } from 'next-i18next'

const Article = (data) => {
  const { t } = useTranslation('common')

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
          {/* speziell article */}
          <div className={styles.subwrapper}>
              <div className={styles.subtitel}>{t("ArticleType")}</div>
              {data.article_type}
          </div>

          <All {...data}/>
        </div>
	</div>
  );
};
export default Article;

export async function getStaticProps({locale}) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}