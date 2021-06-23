import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const BookSection = (data) => {
// console.log("data im book",data)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>
        
        {/* speziell BookSection */}
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Buchtitel</div>
            {data.book_title}
        </div>
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Book Type</div>
            {data.book_section_type}
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
export default BookSection;