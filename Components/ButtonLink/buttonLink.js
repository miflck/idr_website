import styles from './buttonlink.module.scss'
import Link from 'next/link'

export default function Button (props) {
    // console.log("props", props)
    return (
        <Link href={props.href} key={props.titel}>
            <a className={styles.buttonlink}> 
                {props.titel} 
                {props.name}
                <br></br>
            </a>
        </Link>
    )
  }