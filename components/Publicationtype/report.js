import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'

const Report = (data) => {
// console.log("data im Report",data)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell article */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Report Type</div>
                {data.report_type}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Series</div>
                {data.series}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>ISBN</div>
                {data.isbn}
            </div>
        
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Verlag</div>
                {data.publisher}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Ort</div>
                {data.place_of_pub}
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Report;