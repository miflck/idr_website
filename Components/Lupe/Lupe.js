import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Lupe.module.scss";
import Image from "next/image";

const Lupe = (props) => {
  const [open, setSearchbarOpen] = useState(false);
  const handleOnClick = (open) => {
    setSearchbarOpen((open) => !open);
  };

  const [active, setActive] = useState(false);
  const activeClass = active
    ? [styles.lupe, styles.active].join(" ")
    : styles.lupe;
  const activeSitenav = active ? styles.active : "";

  return (
    <div className={`${styles.root} ${active ? styles.active : ""}`}>
      {" "}
      <div
        className={`${styles.lupe_wrapper}`}
        onClick={() => setActive(!active)}
      >
        <div className={`${activeClass}`}>
          <Image src="/lupe.svg" height={35} width={35} />
        </div>
      </div>
      <div className={`${styles.slidein} ${activeSitenav}`}>
        {" "}
        <input
          autoFocus
          className={styles.inputfield}
          type="text"
          placeholder="Suche"
          onChange={(e) => props.setSearch(e.target.value)}
          onKeyDown={(e) => props.handleKeyDown(e)}
          //wollte, dass der Button Suche schwarz wird,
          //wenn ein Filter aktiv ist und per Klicken auf Suche der Filter wieder gelöscht und das Tippfeld verschwindet
          // onFocus={(e) => handleOnClickAktiv(!aktiv)}
        />
      </div>
    </div>
  );
};

Lupe.defaultProps = {};

export default Lupe;
