import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./SearchTerm.module.scss";
import { AppContext, ACTIONS } from "../../context/state";

const SearchTerm = (props) => {
  const { key, term } = props;
  // context
  const globalState = useContext(AppContext);
  const { state } = globalState;
  const { dispatch } = globalState;

  const handleClick = (term) => {
    dispatch({
      type: ACTIONS.REMOVE_SEARCHTERM,
      payload: { element: term },
    });
  };
  return (
    <button key={key} className={styles.root} onClick={() => handleClick(term)}>
      {term}{" "}
      <span className={styles.close} onClick={() => handleClick(term)}>
        x
      </span>
    </button>
  );
};

SearchTerm.defaultProps = {};

export default SearchTerm;
