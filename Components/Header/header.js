// Header.jsx
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import NavMenu from "../Menu/navMenu";
import styles from "./header.module.scss";
import Logo from "./Logo";

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
            <Link href="/">
              <div className={styles.titleLink}>
                <Logo className={styles.logo} />
                <span>— Institute of Design Research</span>
                <span className={styles.seitentitel}>– {getPageTitle()}</span>
              </div>
            </Link>
          </div>
          <NavMenu />
        </div>
      </div>
    </>
  );
};

export default Header;
