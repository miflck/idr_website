import styles from './container.module.scss'


export default function Container({ children }) {
    return <div className={`${styles.container} ${styles.margin_auto}`}>{children}</div>
  }
