import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const ConferenceItem = (data) => {
// console.log("data im ConferenceItem",data)

    const eventdate = new Date(data.event_dates).toLocaleString([], {
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
        });
  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            <a>{data.title[0].text}</a>
        </div>
        <div className={styles.columnwrapper}>  
            {/* speziell ConferenceItem */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Conference Item Type</div>
                {data.conference_type}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Event Title</div>
                {data.event_title}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Event Dates</div>
                {eventdate}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Event Location</div>
                {data.event_location}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Link</div>
                <Link href={data.official_url}>
                    {data.official_url}
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default ConferenceItem;