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
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        {/* speziell ConferenceItem */}
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Conference Item Type</div>
            {data.conference_type}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Event Title</div>
            {data.event_title}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Event Dates</div>
            {eventdate}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Event Location</div>
            {data.event_location}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Link</div>
            <Link href={data.official_url}>
                {data.official_url}
            </Link>
        </div>

        <All {...data}/>

	</div>
  );
};
export default ConferenceItem;