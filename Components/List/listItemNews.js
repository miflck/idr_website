import React, { useEffect, useContext, useState } from 'react';
import { AppContext, ACTIONS } from '../../context/state';
import styles from '../../pages/news.module.scss'
import Link from 'next/link'
// import Container from '../../Components/Container/container'
import TextElement from '../TextElement/textElement'
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement';

const ListItemNews = (props) => {
    const globalState = useContext(AppContext);
    const { state } = globalState
    const { dispatch } = globalState

    const [showHoverGradient, setHoverGradient] = useState();
    const handleShowGradient = (val) => { };

    let hrefprojekte = `/projekte`
    if (props._modelApiKey === 'projekt') {
        hrefprojekte += `/${props.slug}`
    }
    let hrefveranstaltungen = `/veranstaltungen`
    if (props._modelApiKey === 'veranstaltung') {
        hrefveranstaltungen += `/${props.slug}`
    }

    const date = new Date(props.datum).toLocaleString([], {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    // console.log("_modelApiKey", props._modelApiKey)
    let ImageElement;
    if (props.image != null) {
        ImageElement = <div className={styles.bild}>
            <img
                className={styles.image}
                src={props.image.url}
            />
        </div>
    }
    else {
        ImageElement = <></>
    }


    let colors = [];
    props.forschungsfeld.map((forschungsfeld) => {
        colors.push(forschungsfeld.colour.hex)
    });

    let background_style_small = {
        background: `linear-gradient(to right,"white"})`,
        animation: `${styles.fadeOut} 0.5s ease`,
    };

    if (state.showGradient || showHoverGradient || props.filter.length > 0) {
        if(colors.length > 0) {
            background_style_small = {
                background: `linear-gradient(to right, ${colors[0]}, ${colors[1] || "white"})`,
                opacity: 1,
                animation: `${styles.fadeIn} 0.5s ease`
            }
        } else {
            background_style_small = {
                background: 'black'
            }
        }
    } else {
        background_style_small={
            background: 'white'
        }
    }

    return (
        <div className={styles.kachelwrapper} key={props.id} onMouseEnter={() => setHoverGradient(true)} onMouseLeave={() => setHoverGradient(false)}>
            {
                props._modelApiKey === 'projekt' &&

                <div className={styles.kachel} style={background_style_small}>
                    <div className={styles.text}>
                        <div className={styles.uebertitel}>
                            {/* {t("Projekt")} */}Projekt
                        </div>
                        <Link href={hrefprojekte}>
                            <div className={styles.titel}>{props.titel}</div>
                        </Link>
                        <TextElement {...props.newstext} />
                        <div className={styles.element}>
                            <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient} />
                        </div>
                    </div>
                </div>
            }
            {
                props._modelApiKey === 'veranstaltung' &&
                <div className={styles.kachel} style={background_style_small}>
                    <div className={styles.text}>
                        <div className={styles.uebertitel}>
                            {/* {t("Veranstaltung")} */}Veranstaltung
                        </div>
                        <Link href={hrefveranstaltungen}>
                            <div className={styles.titel}>{props.titel}</div>
                        </Link>
                        <div className={styles.date}>{date} Uhr
                            {/* {t("Uhr")} */}
                        </div>
                        <div className={styles.referentIn}>{props.referentIn}</div>
                        <div className={styles.element}>
                            <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient} />
                        </div>
                    </div>
                </div>
            }
            {
                props._modelApiKey === 'news' &&
                <div className={styles.kachel} 
                    style={background_style_small} 
                    // hat nicht immer ein Forschungsfeld dran bis jetzt, deshalb ausgeschaltet und es wechselt einfach ins schwarze
                    >
                    <div className={styles.text}>
                        <div className={styles.uebertitel}>
                            {/* {t("News")} */}News
                        </div>
                        <Link href={props.weblink}>
                            <div className={styles.titel}>{props.titel}</div>
                        </Link>
                        <TextElement {...props.text} />
                        <Link href={props.weblink}>
                            <a className={styles.weblink}>
                                {/* {t("Publilink")} */}Publikationslink
                            </a>
                        </Link>
                        <div className={styles.element}>
                            <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient} />
                        </div>
                    </div>
                    {ImageElement}
                </div>
            }
        </div>
    )
}

export default ListItemNews;