import React from 'react';
import styles from './publicationtype.module.scss';
import All from './All'
import Link from 'next/link'

const AudioVisual = (data) => {
// console.log("data im article",data)

  return (
	<div className={styles.wrapper}>

        <div className={styles.title}>
            <a>{data.title[0].text}</a>
        </div>

        {/* speziell AudioVisual */}
        <div className={styles.subwrapper}>
            <div className={styles.subtitle}>Audio Visual Type</div>
            {data.audio_visual_type}
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
export default AudioVisual;