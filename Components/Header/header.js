// Header.jsx
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import NavMenu from "../Menu/navMenu";
import styles from "./header.module.scss";
import Logo from "./Logo";
import LogoBFH from "./LogoBFH";

const ROUTE_TITLES = {
  "/": "NEWS",
  "/editorial": "ÜBER UNS",
  "/projekte": "PROJEKTE",
  "/team": "TEAM",
  "/veranstaltungen": "VERANSTALTUNGEN",
  "/publikationen": "PUBLIKATIONEN",
  "/podcast": "PODCAST",
  "/impressum": "IMPRESSUM",
};

const Header = () => {
  const router = useRouter();

  const getPageTitle = () => {
    if (ROUTE_TITLES[router.pathname]) {
      return ROUTE_TITLES[router.pathname];
    }
    return router.pathname.split("/")[1].toUpperCase();
  };

  return (
    <>
      <Head>
        <title>IDR</title>
        <link rel="icon" href="../favicon.ico" />
      </Head>

      <div className={styles.root}>
        <div className={styles.headercontainer}>
          <div className={styles.headertitle}>
            <div className={styles.titleLink}>
              <a href="https://www.bfh.ch/de/" className={styles.outlink} target="_blank" rel="noopener noreferrer">
                <LogoBFH className={styles.logoBFH} />
              </a>
              –
              <a href="https://www.hkb.bfh.ch/de/" className={styles.outlink} target="_blank" rel="noopener noreferrer">
                <Logo className={styles.logo} />
              </a>
              <Link href="/">
                <>
                  <span>– Institute of Design Research</span>
                  <span className={styles.seitentitel}>– {getPageTitle()}</span>
                </>
              </Link>
            </div>
          </div>
          <NavMenu />
        </div>
      </div>
    </>
  );
};

export default Header;
