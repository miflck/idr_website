import styles from './listpublikationen.module.scss'
import Link from 'next/link'
import Container from '../Container/container'
import { printIntrospectionSchema } from 'graphql'

const ListItemPublikation =(props)=>{
    // console.log("Publikation ",props.title[0].text)
    // console.log("was kommt hier rein bei listitempublikation", props)
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

    // var titlewithunderline = props.title[0].text.split(' ').join('_');
    let href=`/publikationen` 
    href+=`/${props.eprintid}`

    return(
        <div className={styles.projektwrapper} key={props.id}>
            <Container>
                <Link href={href}>
                    <div className={styles.titel}>
                        <a>{props.title[0].text}</a>
                    </div>
                </Link>
                {PublikationstypeElement}
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