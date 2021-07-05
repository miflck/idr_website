import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const BookSection = (data) => {
// console.log("data im book",data)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            <a>{data.title[0].text}</a>
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell BookSection */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Buchtitel</div>
                {data.book_title}
            </div>
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Book Type</div>
                {data.book_section_type}
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
export default BookSection;