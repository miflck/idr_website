import React from 'react';
import styles from './publicationtype.module.scss';
import Link from 'next/link'
import FilterLink from '../FilterLink/FilterLink';

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const All = (data) => {
    // const date = new Date(data.date).toLocaleString([], {
    //     day: 'numeric',
    //     month: 'long', 
    //     year: 'numeric'
    //     });

    var typewithoutunderline = data.type.split('_').join(' ');

    const { t } = useTranslation('common')
 
  return (
      <>
        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>
                {t("Type")} 
            </div>
            <FilterLink props={typewithoutunderline} href={{ pathname: '/publikationen', query: { keyword: `${data.type}` } }}/>
        </div>
      
        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>{/* {t("Mitwirkende")} */}Mitwirkende</div>
            {data.contributors.map((contributor) => {
            //    console.log(contributor.name.family)
                return (
                    <div className={styles.name}>
                           {contributor.name.given}&nbsp;
                           {contributor.name.family}
                    </div>
                )})
            }
        </div>
        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>{/* {t("Autorenschaft")} */}Autorenschaft</div>
            {data.creators.map((creator) => {
                return (
                    <div className={styles.name}>
                        {creator.name.given}&nbsp;
                        {creator.name.family}
                    </div>
                )})
            }
        </div>

        {/* <div className={styles.subwrapper}>
            <div className={styles.subtitel}>Erstellungsdatum</div>
            {date}
        </div> */}

        {/* <div className={styles.subwrapper}>
            <div className={styles.subtitel}>Letzte Änderungen</div>
            {lastmod}
        </div> */}

        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>{/* {t("Sprache")} */}Sprache</div>
            {data.language}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>{/* {t("Repository")} */}Publication in Repository</div>
            <Link href={data.uri}>
                {data.uri}
            </Link>
        </div>
    </>
  );
};
export default All;

export async function getStaticProps({locale}) {
    //  const res = await fetch(`https://arbor.bfh.ch/cgi/search/advanced/export_arbor_JSON.js?screen=Search&_action_export=1&output=JSON&exp=0%7C1%7C-date%2Fcreators_name%2Ftitle%7Carchive%7C-%7Cdivisions%3Adivisions%3AANY%3AEQ%3ABFH-OE--IN-0005%7C-%7Ceprint_status%3Aeprint_status%3AANY%3AEQ%3Aarchive%7Cmetadata_visibility%3Ametadata_visibility%3AANY%3AEQ%3Ashow&n=&cache=117839`)
      //const publicationdata = await res.json()
      const publicationdata=""
  return {
    props: {
      publicationdata,
      locale,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}

export async function getStaticPaths({locales}) {
  const paths = []
    return {
        paths, fallback: true 
    }
}