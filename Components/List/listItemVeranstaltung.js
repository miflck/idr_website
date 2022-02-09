import React, { useEffect, useContext, useState } from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import styles from '../../pages/veranstaltungen/veranstaltungen.module.scss'
import Link from 'next/link'
import Container from '../../Components/Container/container'
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement';
// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ListItemVeranstaltung = (props) => {
    const globalState = useContext(AppContext);
    const { state } = globalState
    const { dispatch } = globalState

    // const { t } = useTranslation('common')

    const [showHoverGradient, setHoverGradient] = useState();
    const handleShowGradient = (val) => { };

    let href = `/veranstaltungen`
    if (props.slug != "") {
        href += `/${props.slug}`
    }

    const date = new Date(props.datum).toLocaleString([], {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });


    let colors = [];
    props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
    })

    let background_style_small = {
        background: `linear-gradient(to right,"white"})`,
        animation: `${styles.fadeOut} 0.5s ease`,
    };

    if (state.showGradient || showHoverGradient || props.filter.length > 0) {
        background_style_small = {
            background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
            opacity: 1,
            animation: `${styles.fadeIn} 0.5s ease`
        }
    } else {
        background_style_small={
            background: 'white'
        }
    }

    return (
        <div className={styles.veranstaltungscontent} style={background_style_small} key={props.id} style={background_style_small} onMouseEnter={() => setHoverGradient(true)} onMouseLeave={() => setHoverGradient(false)}>
            <Container>
                <div className={styles.datum}>{date} Uhr
                    {/* {t("Uhr")} */}
                </div>
                <Link href={href}>
                    <div className={styles.title}>{props.titel}</div>
                </Link>
                <div className={styles.referentIn}>{props.referentIn}</div>

                <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient} />

            </Container>
        </div>
    )
}

export default ListItemVeranstaltung;