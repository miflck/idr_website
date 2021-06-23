import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'

const Report = (data) => {
// console.log("data im Report",data)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        {/* speziell article */}
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Report Type</div>
            {data.report_type}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Series</div>
            {data.series}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>ISBN</div>
            {data.isbn}
        </div>
       
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Verlag</div>
            {data.publisher}
        </div>
        
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Ort</div>
            {data.place_of_pub}
        </div>

        <All {...data}/>

	</div>
  );
};
export default Report;