// store.js
import React, {createContext, useReducer} from 'react';

const initialState = {
 // color:'#F2F2F2',
 // scrollposition:0,
 // footercolor:'rgba(232,232,232,0.5)',
  showGradient:false,
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

 const ACTIONS = {
  //CHANGE_COLOR:'change color',
  //SET_SCROLLPOS:'set scrollposition',
  //CHANGE_FOOTERCOLOR:'set footer',
    SHOW_GRADIENT:'show gradient',
}

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case ACTIONS.SHOW_GRADIENT:
        return {...state,showGradient:action.payload.showGradient}// do something with the action
      break;  
     
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, StateProvider, ACTIONS }