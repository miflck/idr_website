import styles from './list.module.scss'
import Link from 'next/link'
import Container from '../Container/container'
import { AppContext, ACTIONS } from '../../context/state';
import React, {useEffect, useContext,useState} from 'react';
import ForschungsfeldElement from '../ForschungsfeldElement/forschungsfeldElement'

const ListItemPublikation =(props)=>{
if (props) {

    const globalState = useContext(AppContext);
    const {state}=globalState
    const {dispatch}=globalState


    const [showHoverGradient,setHoverGradient]=useState();
	const handleShowGradient = (val) => {
    };
    

    let href=`/publikationen` 
    href+=`/${props.eprintid}`

    const date = new Date(props.date).toLocaleString([], {
        // month: 'long', 
        year: 'numeric'
        });

      let background_style_small;
      if(state.showGradient || showHoverGradient){
            background_style_small={
                background: `var(--maincolor)`,
                opacity:1,
            }
        }

    return(
        <div className={styles.wrapper} key={props.id} onMouseEnter={ ()=>setHoverGradient(true)} onMouseLeave={ ()=>setHoverGradient(false)}>
            <div className={styles.backgroundwrapper} 
                style={background_style_small}
                ></div>
            <Container>
                <div className={styles.content}>
                <div className={styles.datum}>{date}</div>
                <Link href={href}>
                    <div className={styles.titel}>
                        {props.title[0].text}
                    </div>
                </Link>
                <ForschungsfeldElement {...props} filter={props.filter} addMoreItem={props.addMoreItem} showHoverGradient={showHoverGradient}/>
                </div>
            </Container>
        </div>
    )
}
else{
    return (
      <>
      </>
    )
  }
  } 

export default ListItemPublikation;