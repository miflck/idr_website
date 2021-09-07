import { request, IMPRESSUM } from "../lib/datocms";
import styles from './impressum.module.scss'
import Layout from '../Components/Layout/layout'
import Container from '../Components/Container/container'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TextElement from '../Components/TextElement/textElement'
import React, { useState, useEffect } from 'react'


const Impressum = (props) => {
  console.log(props.impressum.impressum, "impressum")

  const { t } = useTranslation('common')


  return (
    <Layout setMainColor={props.setMainColor} setSecondColor={props.setSecondColor} colorHexCode={props.colorHexCode} colorHexCodeSecond={props.colorHexCodeSecond}>
      <Container>
        <div className={styles.impressumwrapper}>
          <div className={styles.titel}>
            Impressum
          </div>

          <div className={styles.subwrapper}>
            {props.impressum.impressum.impressumsblock.map((impressumsblock) => {
              return (
                <div>
                  <div className={styles.subtitel}>
                    {impressumsblock.titel}
                  </div>
                  <div className={styles.subtext}>
                  <TextElement {...impressumsblock.text} />
                  </div>
                </div>
              )

            })}
          </div>

        </div>
      </Container>
    </Layout>
  )
}

export default Impressum;


export async function getStaticProps({ locale }) {
  const impressum = await request({
    query: IMPRESSUM, variables: { locale: locale },
  });

  return {
    props: {
      impressum,
      ...await serverSideTranslations(locale, ['common']),
    },
  }
}