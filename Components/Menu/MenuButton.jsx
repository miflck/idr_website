// MenuButton.jsx
import React from "react";
import styles from "./menu.module.scss";

const MenuButton = ({ onClick, isOpen }) => {
  return (
    <div className={styles.menubutton} onClick={onClick}>
      <span style={{ display: isOpen ? "none" : "block" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 87.9 86">
          <line className="a" x1="1" y1="10" x2="100" y2="10" />
          <line className="a" x1="1" y1="43" x2="100" y2="43" />
          <line className="a" x1="1" y1="76" x2="100" y2="76" />
        </svg>
      </span>
      <span style={{ display: isOpen ? "block" : "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1.1em" height="1.1em" viewBox="0 0 87.9 86">
          <line className="a" x1="1" y1="43" x2="100" y2="43" />
        </svg>
      </span>
    </div>
  );
};
export default MenuButton;
