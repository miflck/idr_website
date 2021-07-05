import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const AudioVisual = (data) => {
// console.log("data im article",data)

  return (
	<div className={styles.slugwrapper}>

        <div className={styles.titel}>
            <a>{data.title[0].text}</a>
        </div>
        
        <div className={styles.columnwrapper}>  
          {/* speziell AudioVisual */}
          <div className={styles.subwrapper}>
              <div className={styles.subtitel}>Audio Visual Type</div>
              {data.audio_visual_type}
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
export default AudioVisual;