import NavMenu from "../Menu/navMenu";
import styles from "./header.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = (props) => {
  const router = useRouter();
  if (router.pathname === "/") {
    var seitentitel = "NEWS";
  } else if (router.pathname === "/editorial") {
    var seite = router.pathname.split("/");
    var seitentitel = "ÜBER UNS"; //seite[1]
  } else {
    // var seite = router.asPath.split('/').join('— ');
    var seite = router.pathname.split("/");
    var seitentitel = seite[1];
  }

  return (
    <div className={styles.root}>
      <div className={styles.headercontainer}>
        <title>IDR</title>
        <link rel="icon" href="../favicon.ico" />
        <div className={styles.headertitle}>
          <Link href="/">HKB — Institute of Design Research</Link>{" "}
          <span className={styles.seitentitel}> — {seitentitel}</span>
        </div>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
