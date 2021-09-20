import React, {useContext,useState} from 'react';
import { AppContext, ACTIONS } from '../../context/state';

import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = props => {

  const globalState = useContext(AppContext);
  const {state}=globalState
  const { dispatch } = globalState;

  let btn_class;
  let {style,payload:{titel,id,colour}}=props;

  let hover_class = { color: 'var(--maincolor)' };


  const handleHover = (isHover,payload) => {
    if(isHover){
      //  dispatch({ type: ACTIONS.ADD_HOVER_ELEMENT, payload: { element: payload } })
    }else{
      //  dispatch({ type: ACTIONS.REMOVE_HOVER_ELEMENT, payload: { element: payload } })
    }
};





  return (
    <button className = {` ${styles.root} `}
        onMouseEnter={ ()=>handleHover(true,props.payload)} 
        onMouseLeave={ ()=>handleHover(false,props.payload)}
        onClick={() => props.addMoreItem(id)}
        key={id} 
        style={style}
      >
        {titel}

    </button>
  );
};

Button.defaultProps = {

};

export default Button;