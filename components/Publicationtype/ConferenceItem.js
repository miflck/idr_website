import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const ConferenceItem = (data) => {
console.log("data im ConferenceItem",data)

    // hier ist das datum als string angegeben
    // const eventdate = new Date(data.event_dates).toLocaleString([], {
    //     day: 'numeric',
    //     month: 'long', 
    //     year: 'numeric'
    //     });
    
  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>
        <div className={styles.columnwrapper}>  
            {/* speziell ConferenceItem */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("ConferenceItemType")} */} Conference Item Type</div>
                {data.conference_type}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Veranstaltungstitel")} */}Veranstaltungstitel</div>
                {data.event_title}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Veranstaltungsdaten")} */}Veranstaltungsdaten</div>
                {data.event_dates}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Veranstaltungsort")} */}Veranstaltungsort</div>
                {data.event_location}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{/* {t("Link")} */}Link</div>
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