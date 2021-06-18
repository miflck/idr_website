import styles from './listpublikationen.module.scss'
import Link from 'next/link'
import Container from '../Container/container'
import { printIntrospectionSchema } from 'graphql'

const ListItemPublikation =(props)=>{
    // console.log("Publikation ",props.title[0].text)
    console.log("was kommt hier rein bei listitempublikation", props)
if (props) {

    let href=`/publikationen` 
    if(props.isbn!=""){
        href+=`/${props.isbn}`
    }

    let PublikationstypeElement;
    if(filter) {
    let btn_class;
     if(props.filter.includes(props.type)) {
        btn_class = styles.forschungsfeldaktiv
        }
     else {
        btn_class = styles.forschungsfeld
        }
     PublikationstypeElement = <div className={styles.forschungsfeldwrapper}>
                                 <span className={btn_class} >
                                     <a onClick={() => props.addMoreItem(props.type)}
                                     > 
                                     {props.type} 
                                     </a>
                                 </span>
                              </div>
    }

    return(
        <Link href={href}>
            <div className={styles.projektwrapper} key={props.id}>
            <Container>
                <div className={styles.titel}>
                    <a>{props.title[0].text}</a>
                </div>
                {PublikationstypeElement}
            </Container>
            </div>
        </Link>
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