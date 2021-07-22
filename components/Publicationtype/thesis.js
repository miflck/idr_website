import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const Thesis = (data) => {
    const { t } = useTranslation('common')

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            {data.title[0].text}
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell Thesis */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Zusammenfassung")}</div>
                {data.abstract[0].text}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("ThesisType")}</div>
                {data.thesis_type}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Abteilung")}</div>
                {data.department}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Institution")}</div>
                {data.institution}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Keywords")}</div>
                {data.keywords}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Seiten")}</div>
                {data.pages}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Organisationseinheiten")}</div>
                {data.org_units.title}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("OffiziellerLink")}</div>
                <Link href={data.official_url}>
                    <a target="_blank">{data.official_url}</a>
                </Link>
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("ThemaLink")}</div>
                <Link href={data.related_url[0].url}>
                    <a target="_blank">{data.data.related_url[0].url}</a>
                </Link>
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>{t("Projekte")}</div>
                {data.projects.map((project) =>{
                    return (
                        <div>
                            {project.title}
                        </div>
                    )
                })}
            </div>

            <All {...data}/>
        </div>
	</div>
  );
};
export default Thesis;

export async function getStaticProps({locale}) {
    return {
      props: {
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }