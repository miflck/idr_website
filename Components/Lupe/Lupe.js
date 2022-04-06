import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./Lupe.module.scss";
import Image from "next/image";

const Lupe = (props) => {
  const inputRef = useRef();

  const [open, setSearchbarOpen] = useState(false);
  const handleOnClick = (open) => {
    setSearchbarOpen((open) => !open);
  };

  const [active, setActive] = useState(false);
  const activeClass = active
    ? [styles.lupe, styles.active].join(" ")
    : styles.lupe;
  const activeSitenav = active ? styles.active : "";

  const handleKeyDown = (e) => {
    props.handleKeyDown(e);
    if (e.key === "Enter") {
      setActive(false);
      e.target.value = "";
    }
  };

  const handleSubmit = (e) => {
    props.handleSubmit(inputRef.current.value);
    inputRef.current.value = "";
    setActive(!active);
  };

  const handleMagClick = () => {
    if (active) {
      console.log((inputRef.current.value = ""));
      props.setSearch("");
      //inputRef.current.target.value = "";
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
    setActive(!active);
  };

  return (
    <div className={`${styles.root} ${active ? styles.active : ""}`}>
      <div
        className={`${styles.lupe_wrapper}`}
        onClick={() => handleMagClick()}
      >
        <div className={`${activeClass}`}>
          <Image src="/lupe.svg" height={35} width={35} />
        </div>
      </div>
      <div className={`${styles.slidein} ${activeSitenav}`}>
        <input
          size="15"
          ref={inputRef}
          className={styles.inputfield}
          type="text"
          placeholder="Suche"
          onChange={(e) => props.setSearch(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          //wollte, dass der Button Suche schwarz wird,
          //wenn ein Filter aktiv ist und per Klicken auf Suche der Filter wieder gelöscht und das Tippfeld verschwindet
          // onFocus={(e) => handleOnClickAktiv(!aktiv)}
        />
      </div>

      <input
        className={styles.button}
        type="button"
        value="Suche"
        onClick={(e) => handleSubmit(e)}
      />
    </div>
  );
};

Lupe.defaultProps = {};

export default Lupe;
