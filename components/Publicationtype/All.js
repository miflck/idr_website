import React from 'react';
import styles from './publicationtype.module.scss';
import Link from 'next/link'
import FilterLink from '../FilterLink/FilterLink';

const All = (data) => {

    // const date = new Date(data.date).toLocaleString([], {
    //     day: 'numeric',
    //     month: 'long', 
    //     year: 'numeric'
    //     });
    // const lastmod = new Date(data.lastmod).toLocaleString([], {
    //     day: 'numeric',
    //     month: 'long', 
    //     year: 'numeric'
    //     });

    var typewithoutunderline = data.type.split('_').join(' ');
    

  return (
      <>

        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>Type</div>
            <FilterLink props={typewithoutunderline} href={{ pathname: '/publikationen', query: { keyword: `${data.type}` } }}/>
        </div>
      
        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>Mitwirkende</div>
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
            <div className={styles.subtitel}>Autorenschaft</div>
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
            <div className={styles.subtitel}>Sprache</div>
            {data.language}
        </div>

        <div className={styles.subwrapper}>
            <div className={styles.subtitel}>URI</div>
            <Link href={data.uri}>
                {data.uri}
            </Link>
        </div>
    </>
  );
};
export default All;