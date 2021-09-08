// store.js
import React, {createContext, useReducer} from 'react';

const initialState = {
 // color:'#F2F2F2',
 // scrollposition:0,
 // footercolor:'rgba(232,232,232,0.5)',
  showGradient:false,
  hoveredElements:[]
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

 const ACTIONS = {
  //CHANGE_COLOR:'change color',
  //SET_SCROLLPOS:'set scrollposition',
  //CHANGE_FOOTERCOLOR:'set footer',
    SHOW_GRADIENT:'show gradient',
    ADD_HOVER_ELEMENT:'add hover element',
    REMOVE_HOVER_ELEMENT:'remove hover element'

}

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case ACTIONS.SHOW_GRADIENT:
        return {
          ...state,showGradient:action.payload.showGradient
        }// do something with the action
      break;  

      case ACTIONS.ADD_HOVER_ELEMENT:
        return {
          ...state,
          hoveredElements: state.hoveredElements.concat(action.payload.element)
        }// do something with the action
      break;  
      case ACTIONS.REMOVE_HOVER_ELEMENT:
        return {
          ...state,hoveredElements:state.hoveredElements.filter(element => {
            action.payload.element.map(e=>{
              return(
              e.id !==element.id
              )
            })
          })
        }// do something with the action
      break;  
     
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, StateProvider, ACTIONS }