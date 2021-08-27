import React from 'react';
import styles from './publicationtype.module.scss';
import All from './all'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const ConferenceItem = (data) => {
    const { t } = useTranslation('common')

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
                <div className={styles.subtitel}>{t("ConferenceItemType")}</div>
                {data.conference_type}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Veranstaltungstitel")}</div>
                {data.event_title}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Veranstaltungsdaten")}</div>
                {data.event_dates}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Veranstaltungsort")}</div>
                {data.event_location}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Link")}</div>
                <Link href={data.official_url}>
                    <a target="_blank">{data.official_url}</a>
                </Link>
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default ConferenceItem;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }