import styles from "./filterlink.module.scss";
import Link from "next/link";

export default function FilterLink(props) {
  return (
    <Link href={props.href} key={props.props}>
      <span className={styles.filterlink}>
        {props.props}
        <br></br>
      </span>
    </Link>
  );
}
