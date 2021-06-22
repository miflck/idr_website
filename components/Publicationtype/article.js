import React from 'react';
// import styles from './publicationtype.module.scss';

const Article = ({ data }) => {
console.log("data im article",data)

    const date = new Date(data.date).toLocaleString([], {
        month: 'long', 
        year: 'numeric'
        });

  return (
	<div className={styles.wrapper}>
ciao
        

        <div className={styles.articletype}>
            {data.article_type}
        </div>

        <div className={styles.titel}>
            <a>{data.title[0].text}</a>
        </div>
{/* schon vorher durch array mapen, um es in ein element mit titel und value weiterzugeben? */}
        
        <div className={styles.contributors}>
            {publikation.contributors.map((contributor) => {
                    return (
                      <>
                          {contributor.name.map((name)=> {
                              return (
                                <div className={styles.name}>
                                    {name.family}
                                    {name.given}
                                </div>
                              )
                          })}
                      </>
                    )})
            }
        </div>
        <div className={styles.creators}>
            {publikation.creators.map((creator) => {
                    return (
                      <>
                          {creator.name.map((name)=> {
                              return (
                                <div className={styles.name}>
                                    {name.family}
                                    {name.given}
                                </div>
                              )
                          })}
                      </>
                    )})
            }
        </div>

        <div className={styles.date}>
            {date}
        </div>

        <div className={styles.language}>
            {publikation.language}
        </div>

	</div>
  );
};
export default Article;