import styles from "./menu.module.scss";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import SiteLink from "./siteLink";

const NavMenu = (props) => {
  const { t } = useTranslation("common");

  const [open, setMenuOpen] = useState(false);
  const handleOnClick = (open) => {
    setMenuOpen((open) => !open);
  };

  const menuopen = open ? styles.open : "";

  return (
    <div className={`${styles.menuwrapper} `}>
      <div className={styles.menubutton} onClick={handleOnClick}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 87.9 86"
          >
            <line className="a" x1="1" y1="10" x2="100" y2="10" />
            <line className="a" x1="1" y1="43" x2="100" y2="43" />
            <line className="a" x1="1" y1="76" x2="100" y2="76" />
          </svg>
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1em"
            height="1.1em"
            viewBox="0 0 87.9 86"
          >
            <line className="a" x1="1" y1="43" x2="100" y2="43" />
          </svg>
        </span>
      </div>
      {
        <div className={`${styles.menucontent} ${menuopen}`}>
          <SiteLink href={"/editorial/"} sitetitle={"ÜBER UNS"}></SiteLink>
          <SiteLink href={"/"} sitetitle={"NEWS"}></SiteLink>
          <SiteLink href={"/projekte/"} sitetitle={"PROJEKTE"}></SiteLink>
          <SiteLink href={"/team/"} sitetitle={"TEAM"}></SiteLink>
          <SiteLink
            href={"/veranstaltungen/"}
            sitetitle={"VERANSTALTUNGEN"}
          ></SiteLink>
          <SiteLink
            href={"/publikationen/"}
            sitetitle={"PUBLIKATIONEN"}
          ></SiteLink>
          <SiteLink href={"/impressum/"} sitetitle={"IMPRESSUM"}></SiteLink>
        </div>
      }
    </div>
  );
};

export default NavMenu;
