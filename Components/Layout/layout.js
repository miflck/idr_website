import styles from "./layout.module.scss";
import NavMenu from "../Menu/navMenu";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const Layout = (props) => {
  const { children } = props || {};

  return <div className={styles.layoutContainer}>{children}</div>;
};

export default Layout;
