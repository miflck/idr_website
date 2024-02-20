import styles from "./buttonlink.module.scss";
import Link from "next/link";

export default function Button(props) {
  if (props.newTab) {
    return (
      <div className={styles.linkwrapper}>
        <a target="_blank" href={props.href} className={styles.buttonlink}>
          {props.titel}
          {props.name}
          <br></br>
        </a>
      </div>
    );
  } else {
    return (
      <Link href={props.href} key={props.titel} passHref>
        <div className={styles.linkwrapper}>
          <a target="_blank" href={props.href} className={styles.buttonlink}>
            {props.titel}
            {props.name}
            <br></br>
          </a>
        </div>
      </Link>
    );
  }
}
