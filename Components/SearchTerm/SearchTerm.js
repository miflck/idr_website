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
    console.log("handle click", term);
    dispatch({
      type: ACTIONS.REMOVE_SEARCHTERM,
      payload: { element: term },
    });
  };
  return (
    <div key={key} className={styles.root}>
      <button>
        {term} <div onClick={() => handleClick(term)}>x</div>
      </button>
    </div>
  );
};

SearchTerm.defaultProps = {};

export default SearchTerm;
