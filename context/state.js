// store.js
import React, { createContext, useReducer } from "react";

const initialState = {
  // color:'#F2F2F2',
  // scrollposition:0,
  // footercolor:'rgba(232,232,232,0.5)',
  showGradient: false,
  hoveredElements: [],
  hoveredFilters: [],
  activeFilters: [],
  publicationData: [],
};

const AppContext = createContext(initialState);
const { Provider } = AppContext;

const ACTIONS = {
  //CHANGE_COLOR:'change color',
  //SET_SCROLLPOS:'set scrollposition',
  //CHANGE_FOOTERCOLOR:'set footer',

  SET_DATA: "set data",

  SHOW_GRADIENT: "show gradient",

  ADD_HOVER_ELEMENT: "add hover element",
  REMOVE_HOVER_ELEMENT: "remove hover element",

  ADD_HOVER_FILTER: "add hover filter",
  REMOVE_HOVER_FILTER: "remove hover filter",
  REMOVE_ALL_HOVER_FILTER: "remove all hover filter",

  ADD_ACTIVE_FILTER: "add active filter",
  REMOVE_ACTIVE_FILTER: "remove active filter",
  REMOVE_ALL_ACTIVE_FILTER: "remove all active filter",
};

const StateProvider = ({ children }) => {
  let res = [];
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ACTIONS.SHOW_GRADIENT:
        return {
          ...state,
          showGradient: action.payload.showGradient,
        }; // do something with the action
        break;

      case ACTIONS.ADD_HOVER_ELEMENT:
        return {
          ...state,
          hoveredElements: state.hoveredElements.concat(action.payload.element),
        }; // do something with the action
        break;

      case ACTIONS.REMOVE_HOVER_ELEMENT:
        res = state.hoveredElements.filter(
          (item) => !action.payload.element.includes(item)
        );

        return {
          ...state,
          hoveredElements: res,
        }; // do something with the action
        break;

      case ACTIONS.ADD_HOVER_FILTER:
        return {
          ...state,
          hoveredFilters: state.hoveredFilters.concat(action.payload.element),
        }; // do something with the action
        break;

      case ACTIONS.REMOVE_HOVER_FILTER:
        res = state.hoveredFilters.filter(
          (item) => !action.payload.element.includes(item)
        );
        return {
          ...state,
          hoveredFilters: res,
        }; // do something with the action
        break;

      case ACTIONS.REMOVE_ALL_HOVER_FILTER:
        return {
          ...state,
          hoveredFilters: [],
        }; // do something with the action
        break;

      case ACTIONS.ADD_ACTIVE_FILTER:
        return {
          ...state,
          activeFilters: state.activeFilters.concat(action.payload.element),
        }; // do something with the action
        break;

      case ACTIONS.REMOVE_ACTIVE_FILTER:
        res = state.activeFilters.filter(
          (item) => !action.payload.element.includes(item)
        );
        return {
          ...state,
          activeFilters: res,
        }; // do something with the action
        break;

      case ACTIONS.REMOVE_ALL_ACTIVE_FILTER:
        return {
          ...state,
          activeFilters: [],
        };
        break;

      case ACTIONS.SET_DATA:
        return {
          ...state,
          publicationData: action.payload.element,
        }; // do something with the action
        break;

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { AppContext, StateProvider, ACTIONS };
