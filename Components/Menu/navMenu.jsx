import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import SiteLink from "./siteLink";
import styles from "./menu.module.scss";
import MenuButton from "./MenuButton";

const NavMenu = () => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const handleOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const navLinks = [
    { href: "/editorial/", title: "ÜBER UNS" },
    { href: "/", title: "NEWS" },
    { href: "/projekte/", title: "PROJEKTE" },
    { href: "/team/", title: "TEAM" },
    { href: "/veranstaltungen/", title: "VERANSTALTUNGEN" },
    { href: "/publikationen/", title: "PUBLIKATIONEN" },
    { href: "/podcast/", title: "PODCAST" },
    { href: "/impressum/", title: "IMPRESSUM" },
  ];

  return (
    <div className={styles.menuwrapper}>
      <MenuButton onClick={handleOnClick} isOpen={isOpen} />

      <div className={`${styles.menucontent} ${isOpen ? styles.isOpen : ""}`}>
        {navLinks.map(({ href, title }) => (
          <SiteLink key={href} href={href} sitetitle={title} />
        ))}
      </div>
    </div>
  );
};

export default NavMenu;
