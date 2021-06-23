import styles from './list.module.scss'
import Link from 'next/link'
import Container from '../Container/container'

const ListItemPublikation =(props)=>{
if (props) {

    let PublikationstypeElement;
        if(props.filter) {
        let btn_class;
        var typewithoutunderline = props.type.split('_').join(' ');
        if(props.filter.includes(props.type)) {
            btn_class = styles.forschungsfeldaktiv
            }
        else {
            btn_class = styles.forschungsfeld
            }
        PublikationstypeElement = <div className={styles.forschungsfeldwrapper}>
                                    <span className={btn_class} >
                                        <a onClick={() => props.addMoreItem(props.type)}> 
                                            {typewithoutunderline} 
                                        </a>
                                    </span>
                                </div>
        }

    let href=`/publikationen` 
    href+=`/${props.eprintid}`

    const date = new Date(props.date).toLocaleString([], {
        // month: 'long', 
        year: 'numeric'
        });
    return(
        <div className={styles.wrapper} key={props.id}>
            <Container>
                <div className={styles.content}>
                <div className={styles.datum}>{date}</div>
                <Link href={href}>
                    <div className={styles.titel}>
                        <a>{props.title[0].text}</a>
                    </div>
                </Link>
                {PublikationstypeElement}
                </div>
            </Container>
        </div>
    )
}
else{
    return (
      <>
      </>
    )
  }
  } 

export default ListItemPublikation;