import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const Thesis = (data) => {
// console.log("data im Thesis",data.abstract[0].text)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            <a>{data.title[0].text}</a>
        </div>

        <div className={styles.columnwrapper}>  
            {/* speziell Thesis */}
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Abstract</div>
                {data.abstract[0].text}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Thesis Type</div>
                {data.thesis_type}
            </div>
            
            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Department</div>
                {data.department}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Institution</div>
                {data.institution}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Keywords</div>
                {data.keywords}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Pages</div>
                {data.pages}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Org Units</div>
                {data.org_units.title}
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Official Link</div>
                <Link href={data.official_url}>
                    {data.official_url}
                </Link>
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Related Link</div>
                <Link href={data.related_url[0].url}>
                    {data.data.related_url[0].url}
                </Link>
            </div>

            <div className={styles.subwrapper}>
                <div className={styles.subtitel}>Projects</div>
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